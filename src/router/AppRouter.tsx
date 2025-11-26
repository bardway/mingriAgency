import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { SessionConsolePage } from '@/pages/SessionConsolePage';
import { CharactersPage } from '@/pages/CharactersPage';
import { CampaignsPage } from '@/pages/CampaignsPage';
import { ScenesPage } from '@/pages/ScenesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { RulebookIndexPage } from '@/pages/RulebookIndexPage';
import { RulebookSearchPage } from '@/pages/RulebookSearchPage';
import { RulesPage } from '@/pages/RulesPage';
import { SkillsPage } from '@/pages/SkillsPage';
import { SkillsFullPage } from '@/pages/SkillsFullPage';
import { AttributesPage } from '@/pages/AttributesPage';
import { OccupationsPage } from '@/pages/OccupationsPage';
import { CombatPage } from '@/pages/CombatPage';
import { SanityPage } from '@/pages/SanityPage';
import { EquipmentPage } from '@/pages/EquipmentPage';

/**
 * 应用路由配置
 */
export const AppRouter: React.FC = () => {
  const basename = new URL(import.meta.env.BASE_URL, window.location.href).pathname;

  return (
    <BrowserRouter basename={basename}>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/session" element={<SessionConsolePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/scenes" element={<ScenesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* 规则库路由 */}
          <Route path="/rulebook" element={<RulebookIndexPage />} />
          <Route path="/rulebook/search" element={<RulebookSearchPage />} />
          <Route path="/rulebook/rules" element={<RulesPage />} />
          <Route path="/rulebook/skills" element={<SkillsPage />} />
          <Route path="/rulebook/skills-full" element={<SkillsFullPage />} />
          <Route path="/rulebook/attributes" element={<AttributesPage />} />
          <Route path="/rulebook/occupations" element={<OccupationsPage />} />
          <Route path="/rulebook/combat" element={<CombatPage />} />
          <Route path="/rulebook/sanity" element={<SanityPage />} />
          <Route path="/rulebook/equipment" element={<EquipmentPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
