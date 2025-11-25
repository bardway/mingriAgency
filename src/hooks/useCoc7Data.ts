import { useState, useEffect } from 'react';
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
  CombatRules
} from '../types/coc7-knowledgebase';

/**
 * 加载单个JSON文件的辅助函数
 */
async function loadJsonFile<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`加载 ${path} 失败: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

/**
 * 加载完整 COC7 知识库数据的 Hook (从多个分文件加载)
 * 支持按需加载特定模块,提升性能
 */
export function useCoc7Data() {
  const [data, setData] = useState<Coc7KnowledgeBase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // 并行加载所有数据文件
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
          combatRules
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
          loadJsonFile<CombatRules>('/data/combat-rules.json')
        ]);

        // 组合所有数据
        const knowledgeBase: Coc7KnowledgeBase = {
          metadata,
          sections,
          rules,
          attributes,
          derivedStats,
          skillCategories,
          skills,
          occupations,
          glossary,
          combatRules
        };

        setData(knowledgeBase);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('未知错误'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
}

/**
 * 获取特定技能的 Hook
 */
export function useCoc7Skill(skillId: string) {
  const { data, loading, error } = useCoc7Data();
  
  const skill = data?.skills.find((s: Skill) => s.id === skillId);
  
  return { skill, loading, error };
}

/**
 * 获取技能列表(可按分类筛选)
 */
export function useCoc7Skills(category?: string) {
  const { data, loading, error } = useCoc7Data();
  
  const skills = category 
    ? data?.skills.filter((s: Skill) => s.category === category)
    : data?.skills;
  
  return { skills: skills || [], loading, error };
}

/**
 * 获取规则详情
 */
export function useCoc7Rule(ruleId: string) {
  const { data, loading, error } = useCoc7Data();
  
  const rule = data?.rules.find((r: Rule) => r.id === ruleId);
  
  return { rule, loading, error };
}

/**
 * 获取属性列表
 */
export function useCoc7Attributes() {
  const { data, loading, error } = useCoc7Data();
  
  return { attributes: data?.attributes || [], loading, error };
}

/**
 * 搜索技能(按名称)
 */
export function useSearchSkills(query: string) {
  const { data, loading, error } = useCoc7Data();
  
  const results = data?.skills.filter((skill: Skill) => 
    skill.name.toLowerCase().includes(query.toLowerCase()) ||
    skill.nameEn.toLowerCase().includes(query.toLowerCase())
  ) || [];
  
  return { results, loading, error };
}

/**
 * 获取职业列表
 */
export function useCoc7Occupations() {
  const { data, loading, error } = useCoc7Data();
  
  return { occupations: data?.occupations || [], loading, error };
}

/**
 * 获取派生属性列表
 */
export function useCoc7DerivedStats() {
  const { data, loading, error } = useCoc7Data();
  
  return { derivedStats: data?.derivedStats || [], loading, error };
}

/**
 * 获取战斗规则
 */
export function useCoc7CombatRules() {
  const { data, loading, error } = useCoc7Data();
  
  return { combatRules: data?.combatRules, loading, error };
}
