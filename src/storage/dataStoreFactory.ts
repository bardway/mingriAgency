import { IDataStore } from './IDataStore';
import { LocalDataStore } from './LocalDataStore';

export type DataStoreKind = 'local' | 'remote';

/**
 * Factory for creating a concrete IDataStore implementation.
 * Currently returns LocalDataStore; remote implementation can be added later.
 */
export function createDataStore(kind?: DataStoreKind): IDataStore {
  const metaEnv = typeof import.meta !== 'undefined' ? (import.meta as { env?: { VITE_DATA_STORE?: string } }) : { env: undefined };
  const resolvedKind = kind || metaEnv.env?.VITE_DATA_STORE || 'local';

  switch (resolvedKind) {
    case 'local':
    default:
      return new LocalDataStore();
  }
}
