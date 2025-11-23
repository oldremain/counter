import { useEffect, useState } from "react";
import { SETTINGS_STORAGE_KEY, validateSettings } from "@/common/lib";
import type { AppState } from "@/common/types";
import { DEFAULT_APP_STATE } from "@/model/appReducer";

export const useAppStorage = (initialValue: AppState) => {
  const [localState, setLocalState] = useState<AppState>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  const saveToLocalStorage = (v: Partial<AppState>) => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(v));
  };

  useEffect(() => {
    //Try to parse value from localStorage and update state
    try {
      const rawValue = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (rawValue) {
        const parsedValue = JSON.parse(rawValue);
        if (validateSettings(parsedValue)) {
          setLocalState(parsedValue);
        }
      }
    } catch {
      console.error(
        `Can not parse localStorage value of ${SETTINGS_STORAGE_KEY}`
      );
      console.log(
        `Setting defaultvalue of ${JSON.stringify(DEFAULT_APP_STATE)}`
      );
    }

    setIsInitialized(true);
  }, []);

  return [localState, isInitialized, saveToLocalStorage] as const;
};
