import { Campaign, Character, CharacterType, ClueTemplate, SceneTemplate } from '@/domain';

const nowIso = () => new Date().toISOString();
const uid = (prefix: string) => `${prefix}_${Date.now()}`;

export function buildSampleCharacter(): Character {
  const id = uid('char');
  const timestamp = nowIso();
  return {
    id,
    name: '陈默',
    type: CharacterType.INVESTIGATOR,
    attributes: {
      STR: 60,
      CON: 65,
      SIZ: 70,
      DEX: 55,
      APP: 50,
      INT: 75,
      POW: 70,
      EDU: 80,
      LUCK: 60,
    },
    maxHP: 13,
    currentHP: 13,
    maxSAN: 70,
    currentSAN: 70,
    maxMP: 14,
    currentMP: 14,
    skills: [
      { skillId: 'skill_spot_hidden', value: 60 },
      { skillId: 'skill_library_use', value: 70 },
    ],
    occupation: '图书管理员',
    age: 32,
    background: '来自上海的调查员，精通资料研究与线索追踪。',
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function buildSampleCampaign(): Campaign {
  const timestamp = nowIso();
  return {
    id: uid('campaign'),
    title: '迷雾之城',
    ruleSystem: 'COC7',
    description: '一座笼罩在神秘迷雾中的古老城市，调查员们将揭开隐藏在雾中的真相...',
    setting: '1920s 中国上海',
    notes: '推荐3-5人团队，预计6-8次游戏。',
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function buildSampleScene(): SceneTemplate {
  return {
    id: uid('scene'),
    name: '废弃书店',
    summary: '位于老城区的废弃书店，传说曾是神秘学者的聚集地。',
    description: '破旧的木门半掩着，透过窗户可以看到堆满灰尘的书架与散落的残页。',
    clueIds: [],
    prerequisites: [],
  };
}

export function buildSampleClue(): ClueTemplate {
  return {
    id: uid('clue'),
    name: '神秘手稿',
    description: '一本用古老文字书写的手稿，记载着不为人知的仪式。',
    requiredSkillCheck: {
      skillId: 'skill_library_use',
      difficulty: 60,
    },
    relatedClues: [],
    relatedScenes: [],
    isHidden: false,
  };
}
