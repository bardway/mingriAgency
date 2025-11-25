import React, { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { useDataStore } from "@/storage";
import { useModuleData } from "@/data";
import { Character, CharacterType } from "@/domain";

/**
 * 调查员管理页面
 */
export const CharactersPage: React.FC = () => {
  const dataStore = useDataStore();
  const { createSampleCharacter } = useModuleData();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const data = await dataStore.loadCharacters();
      setCharacters(data);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSample = async () => {
    await dataStore.saveCharacter(createSampleCharacter());
    await loadCharacters();
  };

  const handleDelete = async (id: string) => {
    if (confirm("确定要删除此角色吗？")) {
      await dataStore.deleteCharacter(id);
      await loadCharacters();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-ww-orange-400 animate-pulse">加载中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1.5 h-8 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full shadow-glow"></div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-ww-slate-900 to-ww-slate-700 bg-clip-text text-transparent tracking-tight">
            调查员档案
          </h1>
        </div>
        <p className="text-ww-slate-600 ml-5 tracking-wide">
          管理所有调查员角色与 NPC
        </p>
      </div>

      {/* 操作区 */}
      <div className="flex gap-3">
        <Button variant="primary" onClick={handleCreateSample}>
          + 创建示例角色
        </Button>
      </div>

      {/* 角色列表 */}
      {characters.length === 0 ? (
        <Card className="text-center py-16">
          <div className="text-ww-slate-400 mb-4 text-lg">尚无调查员档案</div>
          <p className="text-ww-slate-500 text-sm mb-6">
            点击上方按钮创建示例角色，或手动添加新角色
          </p>
          <Button variant="primary" onClick={handleCreateSample} className="mx-auto">
            创建第一个角色
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((char) => (
            <Card
              key={char.id}
              className="group transition-all duration-300 hover:shadow-glow"
            >
              {/* 角色头部 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-ww-slate-900 group-hover:text-ww-orange-600 transition-colors">
                      {char.name}
                    </h3>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-ww-orange-100 text-ww-orange-700 border border-ww-orange-200">
                      {char.type === CharacterType.INVESTIGATOR ? "调查员" : "NPC"}
                    </span>
                  </div>
                  {char.occupation && (
                    <div className="text-sm text-ww-slate-600">
                      {char.occupation}
                      {char.age && ` · ${char.age}岁`}
                    </div>
                  )}
                </div>
              </div>

              {/* 属性摘要 */}
              <div className="grid grid-cols-4 gap-3 mb-4 p-3 bg-ww-slate-50 rounded-lg border border-ww-slate-200">
                <StatItem label="HP" value={`${char.currentHP}/${char.maxHP}`} />
                <StatItem label="SAN" value={`${char.currentSAN}/${char.maxSAN}`} />
                <StatItem label="MP" value={`${char.currentMP || 0}/${char.maxMP || 0}`} />
                <StatItem label="技能" value={char.skills.length.toString()} />
              </div>

              {/* 主要属性 */}
              <div className="grid grid-cols-4 gap-2 mb-4 text-xs">
                {Object.entries(char.attributes).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col items-center p-2 rounded bg-ww-slate-50 border border-ww-slate-200"
                  >
                    <div className="text-ww-slate-500 font-medium">{key}</div>
                    <div className="text-ww-slate-900 font-bold">{value}</div>
                  </div>
                ))}
              </div>

              {/* 背景摘要 */}
              {char.background && (
                <p className="text-sm text-ww-slate-600 mb-4 line-clamp-2">
                  {char.background}
                </p>
              )}

              {/* 操作按钮 */}
              <div className="flex gap-2 pt-3 border-t border-ww-slate-200">
                <Button
                  variant="secondary"
                  className="flex-1 text-sm"
                  onClick={() => alert("角色详情功能开发中...")}
                >
                  查看详情
                </Button>
                <Button
                  variant="ghost"
                  className="px-3 text-sm hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(char.id)}
                >
                  删除
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 统计信息 */}
      {characters.length > 0 && (
        <div className="flex gap-6 text-sm text-ww-slate-600 pt-4 border-t border-ww-slate-200">
          <div>
            总计角色：
            <span className="font-semibold text-ww-orange-600 ml-1">
              {characters.length}
            </span>
          </div>
          <div>
            调查员：
            <span className="font-semibold text-ww-orange-600 ml-1">
              {characters.filter((c) => c.type === CharacterType.INVESTIGATOR).length}
            </span>
          </div>
          <div>
            NPC：
            <span className="font-semibold text-ww-orange-600 ml-1">
              {characters.filter((c) => c.type === CharacterType.NPC).length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// 辅助组件：属性项
const StatItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-center">
    <div className="text-ww-slate-500 text-xs mb-1">{label}</div>
    <div className="text-ww-slate-900 font-bold text-sm">{value}</div>
  </div>
);
