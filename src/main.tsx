import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './router/AppRouter';
import { DataStoreProvider, RuleDataStoreProvider } from './storage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataStoreProvider>
      <RuleDataStoreProvider>
        <AppRouter />
      </RuleDataStoreProvider>
    </DataStoreProvider>
  </React.StrictMode>,
);
