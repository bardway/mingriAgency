import React, { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { dataStore } from '@/storage';
import { Campaign } from '@/domain';

/**
 * 模组/团管理页面
 */
export const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const data = await dataStore.loadCampaigns();
      setCampaigns(data);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSample = async () => {
    const now = new Date().toISOString();
    const sample: Campaign = {
      id: `campaign_${Date.now()}`,
      title: '迷雾之城',
      ruleSystem: 'COC7',
      description: '一座笼罩在神秘迷雾中的古老城市，调查员们将揭开隐藏在雾中的真相...',
      setting: '1920s 中国上海',
      notes: '推荐3-5人团队，预计6-8次游戏',
      createdAt: now,
      updatedAt: now,
    };
    
    await dataStore.saveCampaign(sample);
    await loadCampaigns();
  };

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除此模组吗？这将删除所有关联的场景和线索！')) {
      await dataStore.deleteCampaign(id);
      await loadCampaigns();
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
            模组管理
          </h1>
        </div>
        <p className="text-ww-slate-600 ml-5 tracking-wide">
          创建和管理克苏鲁跑团模组
        </p>
      </div>

      {/* 操作栏 */}
      <div className="flex gap-3">
        <Button variant="primary" onClick={handleCreateSample}>
          + 创建示例模组
        </Button>
      </div>

      {/* 模组列表 */}
      {campaigns.length === 0 ? (
        <Card className="text-center py-16">
          <div className="text-ww-slate-400 mb-4 text-lg">尚无模组</div>
          <p className="text-ww-slate-500 text-sm mb-6">
            创建你的第一个跑团模组，开始克苏鲁神话之旅
          </p>
          <Button variant="primary" onClick={handleCreateSample} className="mx-auto">
            创建示例模组
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="group transition-all duration-300 hover:shadow-glow"
            >
              {/* 模组头部 */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-ww-slate-900 group-hover:text-ww-orange-600 transition-colors flex-1">
                    {campaign.title}
                  </h3>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-ww-orange-100 text-ww-orange-700 border border-ww-orange-200 ml-2">
                    {campaign.ruleSystem}
                  </span>
                </div>
                
                {campaign.setting && (
                  <div className="text-sm text-ww-slate-600 flex items-center gap-1">
                    <span className="text-ww-orange-500">📍</span>
                    {campaign.setting}
                  </div>
                )}
              </div>

              {/* 模组描述 */}
              {campaign.description && (
                <p className="text-sm text-ww-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {campaign.description}
                </p>
              )}

              {/* 备注 */}
              {campaign.notes && (
                <div className="text-xs text-ww-slate-500 mb-4 p-3 bg-ww-slate-50 rounded-lg border border-ww-slate-200">
                  💡 {campaign.notes}
                </div>
              )}

              {/* 元信息 */}
              <div className="text-xs text-ww-slate-500 mb-4 space-y-1">
                <div>创建于：{new Date(campaign.createdAt).toLocaleDateString('zh-CN')}</div>
                <div>更新于：{new Date(campaign.updatedAt).toLocaleDateString('zh-CN')}</div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2 pt-3 border-t border-ww-slate-200">
                <Button
                  variant="secondary"
                  className="flex-1 text-sm"
                  onClick={() => alert('模组详情功能开发中...')}
                >
                  查看详情
                </Button>
                <Button
                  variant="ghost"
                  className="px-3 text-sm hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(campaign.id)}
                >
                  删除
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 统计信息 */}
      {campaigns.length > 0 && (
        <div className="flex gap-6 text-sm text-ww-slate-600 pt-4 border-t border-ww-slate-200">
          <div>
            总计模组：
            <span className="font-semibold text-ww-orange-600 ml-1">
              {campaigns.length}
            </span>
          </div>
          <div>
            COC7：
            <span className="font-semibold text-ww-orange-600 ml-1">
              {campaigns.filter((c) => c.ruleSystem === 'COC7').length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
