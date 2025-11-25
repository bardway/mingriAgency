import React, { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { useDataStore } from "@/storage";

/**
 * 设置页面
 */
export const SettingsPage: React.FC = () => {
  const dataStore = useDataStore();
  const [importing, setImporting] = useState(false);

  const handleExport = async () => {
    try {
      const exportJson = await dataStore.exportAllData();
      const blob = new Blob([exportJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mingri-coc7-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("导出失败:", error);
      alert("导出失败，请重试");
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        await dataStore.importAllData(content);
        alert("导入成功！");
        window.location.reload();
      } catch (error) {
        console.error("导入失败:", error);
        alert("导入失败，请检查文件格式");
      } finally {
        setImporting(false);
      }
    };

    reader.readAsText(file);
  };

  const handleClearData = async () => {
    if (!confirm("确定要清除所有数据吗？此操作无法撤销！")) {
      return;
    }

    try {
      await dataStore.clearAllData();
      alert("数据已清空");
      window.location.reload();
    } catch (error) {
      console.error("清除失败:", error);
      alert("清除失败，请重试");
    }
  };

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1.5 h-8 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full shadow-glow"></div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-ww-slate-900 to-ww-slate-700 bg-clip-text text-transparent tracking-tight mb-2">
              系统设置
            </h1>
            <p className="text-ww-slate-600 tracking-wide">数据管理与系统设置</p>
          </div>
        </div>
      </div>

      {/* 数据管理 */}
      <Card title="数据管理">
        <div className="space-y-4">
          <div>
            <h4 className="text-ww-slate-800 font-semibold mb-2">导出数据</h4>
            <p className="text-sm text-ww-slate-600 mb-3 leading-relaxed">
              将所有角色、模组、场景、线索和 Session 数据导出为 JSON 文件，用于备份或迁移。
            </p>
            <Button onClick={handleExport} variant="primary">
              📥 导出所有数据
            </Button>
          </div>

          <div className="pt-4 border-t border-ww-slate-300/40">
            <h4 className="text-ww-slate-800 font-semibold mb-2">导入数据</h4>
            <p className="text-sm text-ww-slate-600 mb-3 leading-relaxed">
              从之前导出的 JSON 文件恢复数据。注意：会覆盖同 ID 的现有数据。
            </p>
            <label
              htmlFor="import-file"
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ww-light-200 bg-gradient-to-r from-ww-slate-700/50 to-ww-slate-600/50 text-ww-slate-800 hover:from-ww-slate-600/50 hover:to-ww-slate-500/50 focus:ring-ww-orange-500 border border-ww-slate-300/40 hover:border-ww-orange-500/50 disabled:opacity-50 ${
                importing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            >
              📤 {importing ? '导入中...' : '选择文件导入'}
            </label>
            <input
              id="import-file"
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImport}
              disabled={importing}
            />
          </div>
        </div>
      </Card>

      {/* 危险操作 */}
      <Card title="⚠️ 危险操作">
        <div className="space-y-4">
          <div>
            <h4 className="text-red-600 font-semibold mb-2">清除所有数据</h4>
            <p className="text-sm text-ww-slate-700 mb-3 leading-relaxed">
              此操作将永久删除所有本地数据，包括角色、模组、场景、线索和 Session 记录。此操作无法撤销，请谨慎操作。
            </p>
            <Button onClick={handleClearData} variant="danger">
              🗑️ 清除所有数据
            </Button>
          </div>
        </div>
      </Card>

      {/* 关于 */}
      <Card title="关于">
        <div className="space-y-2 text-sm text-ww-slate-700 font-mono leading-relaxed">
          <p>
            <strong className="text-ww-slate-900">明日调查局 KP 助手</strong>
          </p>
          <p className="text-ww-slate-600">版本: 0.3.0</p>
          <p className="text-ww-slate-600">适用规则: Call of Cthulhu 7th Edition</p>
          <p className="pt-2 text-ww-slate-600 border-t border-ww-slate-300/40 mt-4">
            一个专为 COC7 跑团设计的现代化 KP 辅助工具
          </p>
          <p className="text-ww-slate-500">
            · 西部世界浅色主题 | 玻璃态设计 | 纯前端应用
          </p>
        </div>
      </Card>
    </div>
  );
};
