"use client";

const useLocalStorage = () => {
  // Get Data From LocalStorage
  const GetFromStorage = (key, defaultVal = []) => {
    try {
      const data =
        localStorage.getItem(key) !== null
          ? JSON.parse(localStorage.getItem(key))
          : defaultVal;

      console.log("data: ", data);
      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Set Data To LocalStorage
  const SetToStorage = (key, val) => {
    try {
      const data = localStorage.setItem(key, JSON.stringify(val));
      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  // Remove Data From Storage
  const RemoveFromStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Erase / Delete LocalStorage
  const ClearStorage = () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return {
    GetFromStorage,
    SetToStorage,
    RemoveFromStorage,
    ClearStorage,
  };
};

export default useLocalStorage;
