/**
 * 武器定义
 */
export interface WeaponDefinition {
  id: string;
  name: string;
  skillId: string; // 对应技能 ID
  damage: string; // 伤害公式,如 "1D6", "1D10+2"
  range?: string; // 射程,如 "10码", "接触"
  attacksPerRound?: number; // 每轮攻击次数
  ammo?: number; // 弹药数
  malfunction?: number; // 故障值
  era?: string; // 时代,如 "现代", "1920s"
  description?: string;
}
