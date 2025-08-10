"use client";

import { useEffect, useState, useCallback } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [DataToStore, setDataToStore] = useState(() => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error("Something Went Wrong In Initial");
      return defaultValue;
    }
  });

  // Use callback to memoize the function
  const SetToStorage = useCallback(
    (val) => {
      try {
        const data = JSON.stringify(val);
        setDataToStore(val);
        localStorage.setItem(key, data);
      } catch (error) {
        console.error("Something Went Wrong In Store");
      }
    },
    [key]
  );

  const RemoveFromStorage = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setDataToStore(defaultValue);
    } catch (error) {
      console.error("Something Went Wrong In Remove");
    }
  }, [key, defaultValue]);

  const ClearStorage = useCallback(() => {
    try {
      localStorage.clear();
      setDataToStore(defaultValue);
    } catch (error) {
      console.error("Something Went Wrong In Clear");
    }
  }, [defaultValue]);

  // Add storage event listener for cross-tab sync
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : defaultValue;
          setDataToStore(newValue);
        } catch (error) {
          console.error("Error parsing storage data", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, defaultValue]);

  return {
    DataToStore,
    SetToStorage,
    RemoveFromStorage,
    ClearStorage,
  };
};

export default useLocalStorage;
