import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/Card';
import type { Weapon, Armor, Vehicle } from '@/types/equipment';

type TabType = 'weapons' | 'armor' | 'vehicles';
type EquipmentItem = Weapon | Armor | Vehicle;

/**
 * 装备页面 - 武器、防具、载具
 */
export const EquipmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('weapons');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [armors, setArmors] = useState<Armor[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const [weaponsRes, armorsRes, vehiclesRes] = await Promise.all([
          fetch('/data/weapons.json'),
          fetch('/data/armor.json'),
          fetch('/data/vehicles.json')
        ]);
        
        const weaponsData = await weaponsRes.json();
        const armorsData = await armorsRes.json();
        const vehiclesData = await vehiclesRes.json();
        
        setWeapons(weaponsData);
        setArmors(armorsData);
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('加载装备数据失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // 获取当前选中的数据
  const currentData = useMemo(() => {
    switch (activeTab) {
      case 'weapons':
        return weapons;
      case 'armor':
        return armors;
      case 'vehicles':
        return vehicles;
    }
  }, [activeTab, weapons, armors, vehicles]);

  // 获取分类列表
  const categories = useMemo(() => {
    const cats = new Set<string>();
    currentData.forEach((item: EquipmentItem) => {
      if ('category' in item && item.category) cats.add(item.category);
    });
    return ['all', ...Array.from(cats)];
  }, [currentData]);

  // 过滤数据
  const filteredData = useMemo(() => {
    return currentData.filter((item: EquipmentItem) => {
      const matchesSearch = !searchQuery || 
        item.name?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || ('category' in item && item.category === selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [currentData, searchQuery, selectedCategory]);

  // 获取选中的项目
  const selectedItemData = useMemo(() => {
    return currentData.find((item: EquipmentItem) => item.id === selectedItem);
  }, [currentData, selectedItem]);

  // 渲染武器详情
  const renderWeaponDetail = (weapon: Weapon) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">技能</div>
          <div className="font-semibold text-ww-slate-800">{weapon.skill}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">伤害</div>
          <div className="font-mono text-ww-orange-600">{weapon.damage}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">射程</div>
          <div className="font-semibold text-ww-slate-800">{weapon.range}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">贯穿</div>
          <div className="font-semibold text-ww-slate-800">{weapon.pierce ? '是' : '否'}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">每轮攻击</div>
          <div className="font-semibold text-ww-slate-800">{weapon.roundsPerTurn}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">装弹量</div>
          <div className="font-semibold text-ww-slate-800">{weapon.ammo}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">故障值</div>
          <div className="font-semibold text-ww-slate-800">{weapon.malfunction}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">时代</div>
          <div className="font-semibold text-ww-slate-800">{weapon.era}</div>
        </div>
      </div>
      <div>
        <div className="text-xs text-ww-slate-500 mb-1">价格 (1920s/现代)</div>
        <div className="font-semibold text-ww-slate-800">${weapon.price}</div>
      </div>
      {weapon.inventedYear && weapon.inventedYear !== '——' && (
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">发明时间</div>
          <div className="font-semibold text-ww-slate-800">{weapon.inventedYear}</div>
        </div>
      )}
    </div>
  );

  // 渲染防具详情
  const renderArmorDetail = (armor: Armor) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">护甲值</div>
          <div className="font-mono text-ww-orange-600 text-xl">{armor.armorValue}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">移动惩罚</div>
          <div className="font-semibold text-ww-slate-800">{armor.movPenalty || 0}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">覆盖位置</div>
          <div className="font-semibold text-ww-slate-800">{armor.coverage}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">使用物种</div>
          <div className="font-semibold text-ww-slate-800">{armor.species}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">防利器穿刺</div>
          <div className="font-semibold text-ww-slate-800">{armor.antiPierce ? '是' : '否'}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">时代</div>
          <div className="font-semibold text-ww-slate-800">{armor.era}</div>
        </div>
      </div>
      <div>
        <div className="text-xs text-ww-slate-500 mb-1">价格 (1920s/现代)</div>
        <div className="font-semibold text-ww-slate-800">${armor.price}</div>
      </div>
    </div>
  );

  // 渲染载具详情
  const renderVehicleDetail = (vehicle: Vehicle) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">驾驶技能</div>
          <div className="font-semibold text-ww-slate-800">{vehicle.skill}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">移动力</div>
          <div className="font-mono text-ww-orange-600">{vehicle.mov}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">体格</div>
          <div className="font-semibold text-ww-slate-800">{vehicle.build}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">护甲</div>
          <div className="font-semibold text-ww-slate-800">{vehicle.armor}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">载客量</div>
          <div className="font-semibold text-ww-slate-800">{vehicle.passengers}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">可驾驶体格</div>
          <div className="font-semibold text-ww-slate-800">{vehicle.driverBuild}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">可乘坐体格</div>
          <div className="font-semibold text-ww-slate-800">{vehicle.passengerBuild}</div>
        </div>
        <div>
          <div className="text-xs text-ww-slate-500 mb-1">时代</div>
          <div className="font-semibold text-ww-slate-800">{vehicle.era}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 加载状态 */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-ww-orange-500/30 border-t-ww-orange-500 rounded-full animate-spin"></div>
            <div className="text-ww-slate-600">加载装备数据中...</div>
          </div>
        </div>
      ) : (
        <>
          {/* 页面标题 */}
          <div className="relative">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full shadow-glow"></div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-ww-slate-900 to-ww-slate-700 bg-clip-text text-transparent tracking-tight">
            装备系统
          </h1>
        </div>
        <p className="text-sm sm:text-base text-ww-slate-600 ml-3 sm:ml-5 tracking-wide">
          武器、防具与载具资料库
        </p>
      </div>

      {/* 标签切换 */}
      <div className="flex gap-2 border-b border-ww-slate-200 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('weapons'); setSelectedCategory('all'); setSelectedItem(null); }}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 font-medium transition-all whitespace-nowrap ${
            activeTab === 'weapons'
              ? 'text-ww-orange-600 border-b-2 border-ww-orange-500'
              : 'text-ww-slate-600 hover:text-ww-slate-900'
          }`}
        >
          武器
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-ww-slate-100 text-ww-slate-600">
            {weapons.length}
          </span>
        </button>
        <button
          onClick={() => { setActiveTab('armor'); setSelectedCategory('all'); setSelectedItem(null); }}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 font-medium transition-all whitespace-nowrap ${
            activeTab === 'armor'
              ? 'text-ww-orange-600 border-b-2 border-ww-orange-500'
              : 'text-ww-slate-600 hover:text-ww-slate-900'
          }`}
        >
          防具
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-ww-slate-100 text-ww-slate-600">
            {armors.length}
          </span>
        </button>
        <button
          onClick={() => { setActiveTab('vehicles'); setSelectedCategory('all'); setSelectedItem(null); }}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 font-medium transition-all whitespace-nowrap ${
            activeTab === 'vehicles'
              ? 'text-ww-orange-600 border-b-2 border-ww-orange-500'
              : 'text-ww-slate-600 hover:text-ww-slate-900'
          }`}
        >
          载具
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-ww-slate-100 text-ww-slate-600">
            {vehicles.length}
          </span>
        </button>
      </div>

      {/* 搜索和分类 */}
      <div className="space-y-4">
        {/* 搜索框 */}
        <input
          type="text"
          placeholder="搜索名称..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 sm:px-5 py-2.5 sm:py-3 glass rounded-xl border border-ww-slate-300/50 
                   focus:outline-none focus:border-ww-orange-500/50 focus:shadow-glow-sm
                   text-sm sm:text-base text-ww-slate-800 placeholder-ww-slate-400 transition-all duration-300"
        />

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'glass-strong border border-ww-orange-500/40 text-ww-orange-600 shadow-glow-sm'
                  : 'glass border border-ww-slate-300/50 text-ww-slate-600 hover:border-ww-orange-500/30'
              }`}
            >
              {cat === 'all' ? '全部' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 数据展示 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* 列表 */}
        <div className="lg:col-span-1 space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
          {filteredData.length === 0 ? (
            <Card className="text-center py-8">
              <div className="text-ww-slate-400">未找到匹配的数据</div>
            </Card>
          ) : (
            filteredData.map((item: EquipmentItem) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-300 ${
                  selectedItem === item.id
                    ? 'glass-strong border border-ww-orange-500/40 shadow-glow-sm'
                    : 'glass border border-ww-slate-300/50 hover:border-ww-orange-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm sm:text-base font-bold text-ww-slate-800">{item.name}</div>
                    {'category' in item && item.category && (
                      <div className="text-xs text-ww-slate-500 mt-0.5">{item.category}</div>
                    )}
                  </div>
                  {activeTab === 'weapons' && 'damage' in item && item.damage && (
                    <div className="text-xs sm:text-sm font-mono text-ww-orange-600 bg-ww-orange-500/10 px-2 py-1 rounded">
                      {item.damage}
                    </div>
                  )}
                  {activeTab === 'armor' && 'armorValue' in item && (
                    <div className="text-xs sm:text-sm font-mono text-ww-orange-600 bg-ww-orange-500/10 px-2 py-1 rounded">
                      护甲 {item.armorValue}
                    </div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* 详情面板 */}
        <div className="lg:col-span-2">
          {selectedItemData ? (
            <Card>
              <div className="space-y-6">
                {/* 标题 */}
                <div className="border-b border-ww-slate-200 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-ww-slate-900">
                      {selectedItemData.name}
                    </h2>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-ww-orange-100 text-ww-orange-700 border border-ww-orange-200">
                      {'category' in selectedItemData ? selectedItemData.category : activeTab}
                    </span>
                  </div>
                </div>

                {/* 详细信息 */}
                {activeTab === 'weapons' && renderWeaponDetail(selectedItemData as Weapon)}
                {activeTab === 'armor' && renderArmorDetail(selectedItemData as Armor)}
                {activeTab === 'vehicles' && renderVehicleDetail(selectedItemData as Vehicle)}
              </div>
            </Card>
          ) : (
            <Card className="text-center py-16">
              <div className="text-ww-slate-400 text-lg">选择一个项目查看详情</div>
            </Card>
          )}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="flex items-center justify-between text-sm text-ww-slate-500">
        <div>
          显示 {filteredData.length} / {currentData.length} 项
        </div>
        <div>
          共 {weapons.length + armors.length + vehicles.length} 个装备数据
        </div>
      </div>
        </>
      )}
    </div>
  );
};
