export * from '@/domain';
export * from './coc7-knowledgebase';
export type { Weapon, Armor, Vehicle, SkillExtended, OccupationFull } from './equipment';

export type UUID = string;

export interface BaseEntity {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncData<T> {
  data: T | null;
  state: LoadingState;
  error: Error | null;
}
