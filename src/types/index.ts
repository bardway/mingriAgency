// 类型出口聚合
export * from "@/domain";
export * from "./coc7-knowledgebase";

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
