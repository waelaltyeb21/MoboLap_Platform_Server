"use client";

import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [DataToStore, setDataToStore] = useState(() => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error("Something Went Wrong In Initial");
      return defaultValue; // FallBack Value
    }
  });

  const SetToStorage = (val) => {
    try {
      const data = JSON.stringify(val);
      setDataToStore(val);
      localStorage.setItem(key, data);
    } catch (error) {
      console.error("Something Went Wrong In Store");
    }
  };

  const RemoveFromStorage = () => {
    try {
      localStorage.removeItem(key);
      setDataToStore(defaultValue);
    } catch (error) {
      console.error("Something Went Wrong In Remove");
    }
  };

  const ClearStorage = () => {
    try {
      localStorage.clear();
      setDataToStore(defaultValue);
    } catch (error) {
      console.error("Something Went Wrong In Clear");
    }
  };

  // Sync The State With Storage
  useEffect(() => {
    // Update The State When The Component A Mount
    const item = localStorage.getItem(key);
    if (item !== null) {
      setDataToStore(JSON.parse(item));
    }
  }, [key]);

  return {
    DataToStore,
    SetToStorage,
    RemoveFromStorage,
    ClearStorage,
  };
};

export default useLocalStorage;
