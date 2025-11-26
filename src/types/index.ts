// ���ͳ��ھۺ�
export * from "@/domain";
export * from "./coc7-knowledgebase";
export * from "./equipment";

// ͨ�����Ͷ���
export type UUID = string;

export interface BaseEntity {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
}

// ���ݼ���״̬
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncData<T> {
  data: T | null;
  state: LoadingState;
  error?: Error;
}
