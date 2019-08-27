import { useState, useEffect } from "react";

export default function useLocalStorage(name, defaultValue) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(name);
    if (storedValue !== null) {
      setValue(storedValue);
    }
  }, []);

  return value;
}
