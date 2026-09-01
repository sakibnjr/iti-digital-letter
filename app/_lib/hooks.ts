'use client';

import { useSyncExternalStore, useCallback } from 'react';
import { getStoredLang, setStoredLang } from './storage';

// Dispatch custom event when storage is modified in same window
function notifyStorageChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('iti_storage_update'));
  }
}

function subscribeStorage(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('iti_storage_update', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('iti_storage_update', callback);
  };
}

export function useLang(): ['bn' | 'en', (lang: 'bn' | 'en') => void] {
  const lang = useSyncExternalStore<'bn' | 'en'>(
    subscribeStorage,
    () => getStoredLang(),
    () => 'bn' // Server snapshot
  );

  const updateLang = useCallback((newLang: 'bn' | 'en') => {
    setStoredLang(newLang);
    notifyStorageChange();
  }, []);

  return [lang, updateLang];
}

export function notifyStorageUpdated() {
  notifyStorageChange();
}
