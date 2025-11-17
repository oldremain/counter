import { useEffect, useState } from "react";
import type { Settings as SettingsType, Sheet } from "@common/types";
import {
  DEFAULT_SETTINGS,
  LOCAL_STORAGE_KEY,
  validateSettings,
} from "@common/lib";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Settings } from "../features/Settings/Settings";
import { Counter } from "../features/Counter/Counter";
import * as s from "./App.styles";

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [settings, setSettings] = useState<SettingsType>(DEFAULT_SETTINGS);
  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(DEFAULT_SETTINGS.min);
  const [sheet, setSheet] = useState<Sheet>("counter");

  const saveSettings = (settings: SettingsType) => {
    setCounter(settings.min);
    setSheet("counter");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  };

  useEffect(() => {
    let settings = DEFAULT_SETTINGS;
    try {
      const rawValue = localStorage.getItem("minmax");

      if (rawValue) {
        const parsedValue = JSON.parse(rawValue);
        const isValid =
          (parsedValue satisfies SettingsType) && validateSettings(parsedValue);

        if (isValid) {
          settings = parsedValue;
        }
      }
    } catch {
      console.error(`Can not parse localStorage value of "minmax"`);
      console.log(`Setting defaultvalue of ${JSON.stringify(settings)}`);
    }

    setSettings({
      min: settings.min,
      max: settings.max,
      step: settings.step,
    });

    setCounter(settings.min || 0);

    setIsInitialized(true);
  }, []);

  return (
    <>
      {isInitialized && (
        <Box sx={s.appContainer}>
          <Container sx={s.counterContainer}>
            <Grid container spacing={4} sx={s.gridContainer}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Settings
                  settings={settings}
                  sheet={sheet}
                  error={error}
                  setSettings={setSettings}
                  saveSettings={saveSettings}
                  setError={setError}
                  setSheet={setSheet}
                />
              </Grid>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Counter
                  counter={counter}
                  settings={settings}
                  sheet={sheet}
                  error={error}
                  setCount={setCounter}
                  setSheet={setSheet}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};
