'use client';

import { useEffect, useMemo, useState } from 'react';

export type HookResponse<T> = readonly [
  T,
  React.Dispatch<React.SetStateAction<T>>
];

export function usePersitedState<T = unknown>(
  storageKey: string,
  initialState?: T,
): HookResponse<T> {
  // Check if window object is defined (browser environment)
  const isClient = useMemo(() => typeof window === 'object', []);

  const [state, setState] = useState<T>(() => {
    if (isClient) {
      const storageValue = window.localStorage.getItem(storageKey);

      if (storageValue) {
        return JSON.parse(storageValue) as T;
      }
    }

    return initialState as T;
  });

  useEffect(() => {
    // Check if window object is defined (browser environment)
    if (isClient) {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }, [state, storageKey, isClient]);

  return [state, setState];
}
