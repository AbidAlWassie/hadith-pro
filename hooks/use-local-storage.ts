"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  };

  // Get from local storage then parse stored json or return initialValue
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  return [storedValue, setValue] as const;
}

export function useSavedHadiths() {
  const [savedHadiths, setSavedHadiths] = useLocalStorage<string[]>(
    "saved-hadiths",
    []
  );
  const [favoriteHadiths, setFavoriteHadiths] = useLocalStorage<string[]>(
    "favorite-hadiths",
    []
  );

  const isHadithSaved = (hadithId: string) => savedHadiths.includes(hadithId);
  const isHadithFavorited = (hadithId: string) =>
    favoriteHadiths.includes(hadithId);

  const toggleSavedHadith = (hadithId: string) => {
    setSavedHadiths((prev) =>
      prev.includes(hadithId)
        ? prev.filter((id) => id !== hadithId)
        : [...prev, hadithId]
    );
  };

  const toggleFavoriteHadith = (hadithId: string) => {
    setFavoriteHadiths((prev) =>
      prev.includes(hadithId)
        ? prev.filter((id) => id !== hadithId)
        : [...prev, hadithId]
    );
  };

  return {
    savedHadiths,
    favoriteHadiths,
    isHadithSaved,
    isHadithFavorited,
    toggleSavedHadith,
    toggleFavoriteHadith,
  };
}
