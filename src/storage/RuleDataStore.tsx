import React, { createContext, useContext, useMemo } from 'react';
import type {
  Coc7KnowledgeBase,
  Coc7Metadata,
  Section,
  Rule,
  Attribute,
  DerivedStat,
  SkillCategory,
  Skill,
  Occupation,
  GlossaryTerm,
  CombatRules,
} from '@/types/coc7-knowledgebase';

export interface IRuleDataStore {
  loadKnowledgeBase(): Promise<Coc7KnowledgeBase>;
}

/**
  * Local-only rule data store backed by static JSON files in public/data.
  */
export class LocalRuleDataStore implements IRuleDataStore {
  private cache: Coc7KnowledgeBase | null = null;

  async loadKnowledgeBase(): Promise<Coc7KnowledgeBase> {
    if (this.cache) {
      return this.cache;
    }

    const [
      metadata,
      sections,
      rules,
      attributes,
      derivedStats,
      skillCategories,
      skills,
      occupations,
      glossary,
      combatRules,
    ] = await Promise.all([
      loadJsonFile<Coc7Metadata>('/data/metadata.json'),
      loadJsonFile<Section[]>('/data/sections.json'),
      loadJsonFile<Rule[]>('/data/rules.json'),
      loadJsonFile<Attribute[]>('/data/attributes.json'),
      loadJsonFile<DerivedStat[]>('/data/derived-stats.json'),
      loadJsonFile<SkillCategory[]>('/data/skill-categories.json'),
      loadJsonFile<Skill[]>('/data/skills.json'),
      loadJsonFile<Occupation[]>('/data/occupations.json'),
      loadJsonFile<GlossaryTerm[]>('/data/glossary.json'),
      loadJsonFile<CombatRules>('/data/combat-rules.json'),
    ]);

    this.cache = {
      metadata,
      sections,
      rules,
      attributes,
      derivedStats,
      skillCategories,
      skills,
      occupations,
      glossary,
      combatRules,
    };

    return this.cache;
  }
}

const RuleDataStoreContext = createContext<IRuleDataStore>(new LocalRuleDataStore());

export const createRuleDataStore = () => new LocalRuleDataStore();

export const RuleDataStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useMemo(() => createRuleDataStore(), []);
  return <RuleDataStoreContext.Provider value={store}>{children}</RuleDataStoreContext.Provider>;
};

export const useRuleDataStore = () => useContext(RuleDataStoreContext);

async function loadJsonFile<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`加载 ${path} 失败: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}
