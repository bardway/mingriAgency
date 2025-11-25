import { SkillDefinition, SkillType } from '@/domain';
import type { Skill } from '@/types';

/**
 * Map rulebook skill data to internal SkillDefinition.
 * This keeps UI/state aligned when switching rule data source.
 */
export function mapRulebookSkillToDomain(skill: Skill): SkillDefinition {
  const baseValue = typeof skill.base === 'number' ? skill.base : parseInt(String(skill.base), 10) || 0;
  return {
    id: skill.id,
    name: skill.name,
    type: skill.hasSpecialization ? SkillType.BRANCHED : SkillType.STANDARD,
    baseValue,
    description: skill.description,
    branches: skill.specializations,
    category: skill.category,
  };
}
