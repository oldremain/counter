import { useEffect, useState } from "react";

export const useStorage = <T>(key: string, defaultValue?: T) => {
  const [localValue, setLocalValue] = useState<T | undefined>(defaultValue);

  const setValue = (v: T) => {
    localStorage.setItem(key, JSON.stringify(v));
    setLocalValue(v);
  };

  useEffect(() => {
    let settings = defaultValue;
    try {
      const rawValue = localStorage.getItem(key) || "";
      if (rawValue) {
        const parsedValue = JSON.parse(rawValue);
        if (parsedValue satisfies T) {
          settings = parsedValue;
        }
      }
    } catch {
      console.error(`Can not parse localStorage value of ${key}`);
      console.log(`Setting defaultvalue of ${JSON.stringify(defaultValue)}`);
    }
    setValue(settings as T);
  }, []);

  return [localValue, setValue] as const;
};
