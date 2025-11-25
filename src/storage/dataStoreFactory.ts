import { IDataStore } from './IDataStore';
import { LocalDataStore } from './LocalDataStore';

export type DataStoreKind = 'local' | 'remote';

/**
 * Factory for creating a concrete IDataStore implementation.
 * Currently returns LocalDataStore; remote implementation can be added later.
 */
export function createDataStore(kind?: DataStoreKind): IDataStore {
  const resolvedKind =
    kind ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_DATA_STORE) ||
    'local';

  switch (resolvedKind) {
    case 'local':
    default:
      return new LocalDataStore();
  }
}
