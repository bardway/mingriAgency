import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ModuleLayout } from '@/components/ModuleLayout';
import { HomePage } from '@/pages/HomePage';
import { KPDashboardPage } from '@/pages/kp/KPDashboardPage';
import { SessionConsolePage } from '@/pages/kp/SessionConsolePage';
import { CharactersPage } from '@/pages/kp/CharactersPage';
import { DesignerDashboardPage } from '@/pages/designer/DesignerDashboardPage';
import { ModuleDesignerPage } from '@/pages/designer/ModuleDesignerPage';
import { RulebookIndexPage } from '@/pages/rulebook/RulebookIndexPage';
import { RulebookSearchPage } from '@/pages/rulebook/RulebookSearchPage';
import { RulesPage } from '@/pages/rulebook/RulesPage';
import { SkillsPage } from '@/pages/rulebook/SkillsPage';
import { AttributesPage } from '@/pages/rulebook/AttributesPage';
import { OccupationsPage } from '@/pages/rulebook/OccupationsPage';
import { CombatPage } from '@/pages/rulebook/CombatPage';
import { SanityPage } from '@/pages/rulebook/SanityPage';
import { EquipmentPage } from '@/pages/rulebook/EquipmentPage';

/**
 * 应用路由配置 - 三大模块结构
 */
export const AppRouter: React.FC = () => {
  const basename = new URL(import.meta.env.BASE_URL, window.location.href).pathname;

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* 主入口 */}
        <Route path="/" element={<HomePage />} />
        
        {/* KP中控台模块 */}
        <Route path="/kp/*" element={
          <ModuleLayout module="kp" title="KP 中控台">
            <Routes>
              <Route path="/" element={<KPDashboardPage />} />
              <Route path="/session" element={<SessionConsolePage />} />
              <Route path="/characters" element={<CharactersPage />} />
            </Routes>
          </ModuleLayout>
        } />

        {/* 模组创建模块 */}
        <Route path="/designer/*" element={
          <ModuleLayout module="designer" title="模组创建">
            <Routes>
              <Route path="/" element={<DesignerDashboardPage />} />
              <Route path="/module" element={<ModuleDesignerPage />} />
            </Routes>
          </ModuleLayout>
        } />

        {/* 规则库模块 */}
        <Route path="/rulebook/*" element={
          <ModuleLayout module="rulebook" title="规则库">
            <Routes>
              <Route path="/" element={<RulebookIndexPage />} />
              <Route path="/search" element={<RulebookSearchPage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/attributes" element={<AttributesPage />} />
              <Route path="/occupations" element={<OccupationsPage />} />
              <Route path="/combat" element={<CombatPage />} />
              <Route path="/sanity" element={<SanityPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
            </Routes>
          </ModuleLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
};
