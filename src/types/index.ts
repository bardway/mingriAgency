// 统一导出所有类型定义
export * from '../domain/Campaign';
export * from '../domain/Character';
export * from '../domain/Insanity';
export * from '../domain/Session';
export * from '../domain/Skill';
export * from '../domain/Weapon';

// 通用类型定义
export type UUID = string;

export interface BaseEntity {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
}

// 数据加载状态
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncData<T> {
  data: T | null;
  state: LoadingState;
  error?: Error;
}
