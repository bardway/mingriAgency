import React, { createContext, useContext, useMemo } from 'react';
import { IDataStore } from './IDataStore';
import { createDataStore, DataStoreKind } from './dataStoreFactory';

let activeDataStore: IDataStore = createDataStore();

export const setActiveDataStore = (store: IDataStore) => {
  activeDataStore = store;
};

export const getActiveDataStore = () => activeDataStore;

interface DataStoreProviderProps {
  children: React.ReactNode;
  kind?: DataStoreKind;
  instance?: IDataStore;
}

const DataStoreContext = createContext<IDataStore>(activeDataStore);

/**
 * Provides IDataStore via React context so UI/state can swap between local and remote implementations.
 */
export const DataStoreProvider: React.FC<DataStoreProviderProps> = ({
  children,
  kind,
  instance,
}) => {
  const store = useMemo(() => instance ?? createDataStore(kind), [instance, kind]);

  // Keep global reference in sync for non-React consumers (e.g., Zustand stores).
  setActiveDataStore(store);

  return <DataStoreContext.Provider value={store}>{children}</DataStoreContext.Provider>;
};

export const useDataStore = () => useContext(DataStoreContext);
