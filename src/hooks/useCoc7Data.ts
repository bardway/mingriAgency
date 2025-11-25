import { useEffect, useState } from "react";
import { useRuleDataStore } from "@/storage";
import type { Coc7KnowledgeBase, Rule, Skill } from "../types/coc7-knowledgebase";

/**
 * Rulebook data hooks backed by IRuleDataStore (local JSON by default).
 */
export function useCoc7Data() {
  const ruleDataStore = useRuleDataStore();
  const [data, setData] = useState<Coc7KnowledgeBase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const kb = await ruleDataStore.loadKnowledgeBase();
        if (!cancelled) {
          setData(kb);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("未知错误"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [ruleDataStore]);

  return { data, loading, error };
}

export function useCoc7Skill(skillId: string) {
  const { data, loading, error } = useCoc7Data();
  const skill = data?.skills.find((s: Skill) => s.id === skillId);
  return { skill, loading, error };
}

export function useCoc7Skills(category?: string) {
  const { data, loading, error } = useCoc7Data();
  const skills = category ? data?.skills.filter((s: Skill) => s.category === category) : data?.skills;
  return { skills: skills || [], loading, error };
}

export function useCoc7Rule(ruleId: string) {
  const { data, loading, error } = useCoc7Data();
  const rule = data?.rules.find((r: Rule) => r.id === ruleId);
  return { rule, loading, error };
}

export function useCoc7Attributes() {
  const { data, loading, error } = useCoc7Data();
  return { attributes: data?.attributes || [], loading, error };
}

export function useSearchSkills(query: string) {
  const { data, loading, error } = useCoc7Data();
  const results =
    data?.skills.filter((skill: Skill) =>
      skill.name.toLowerCase().includes(query.toLowerCase()) ||
      skill.nameEn.toLowerCase().includes(query.toLowerCase())
    ) || [];
  return { results, loading, error };
}

export function useCoc7Occupations() {
  const { data, loading, error } = useCoc7Data();
  return { occupations: data?.occupations || [], loading, error };
}

export function useCoc7DerivedStats() {
  const { data, loading, error } = useCoc7Data();
  return { derivedStats: data?.derivedStats || [], loading, error };
}

export function useCoc7CombatRules() {
  const { data, loading, error } = useCoc7Data();
  return { combatRules: data?.combatRules, loading, error };
}
