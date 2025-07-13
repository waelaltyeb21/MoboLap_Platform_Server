import React, { useEffect, useState } from "react";

const useDebounce = (val, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(val);

  useEffect(() => {
    const handeler = setTimeout(() => setDebouncedValue(val), delay);
    return () => clearTimeout(handeler);
  }, [val, delay]);

  return debouncedValue;
};

export default useDebounce;
