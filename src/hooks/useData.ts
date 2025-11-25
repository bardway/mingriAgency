import { useState, useEffect } from 'react';
import { AsyncData, LoadingState } from '../types';

/**
 * 通用数据加载 Hook
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  dependencies: unknown[] = []
): AsyncData<T> {
  const [data, setData] = useState<T | null>(null);
  const [state, setState] = useState<LoadingState>('idle');
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    let cancelled = false;
    
    const fetchData = async () => {
      setState('loading');
      setError(undefined);
      
      try {
        const result = await fetcher();
        if (!cancelled) {
          setData(result);
          setState('success');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('未知错误'));
          setState('error');
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, dependencies);

  return { data, state, error };
}

/**
 * 本地存储 Hook
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('读取本地存储失败:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('保存到本地存储失败:', error);
    }
  };

  return [storedValue, setValue];
}
