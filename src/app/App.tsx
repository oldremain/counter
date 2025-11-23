import { useEffect, useReducer } from "react";
import {
  DEFAULT_APP_STATE,
  appReducer,
  initAppStateAC,
  updateCounterAC,
  updateSettingsAC,
  updateErrorAC,
  type UpdateSettingsPayload,
  type UpdateErrorPayload,
} from "@/model/appReducer";
import type { AppState } from "@/common/types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useAppStorage } from "@/common/hooks/useAppStorage";
import { Settings } from "@/features/Settings/Settings";
import { Counter } from "@/features/Counter/Counter";
import * as s from "./App.styles";

export const App = () => {
  const [storage, isInitializedStorage, saveToStorage] =
    useAppStorage(DEFAULT_APP_STATE);

  const [appState, dispatchAppState] = useReducer(
    appReducer,
    DEFAULT_APP_STATE
  );

  const saveSettingsHandler = (settings: AppState) => {
    dispatchAppState(updateCounterAC({ counter: settings.min }));
    saveToStorage({
      min: settings.min,
      max: settings.max,
      step: settings.step,
    });
  };

  const setSettingsHandler = (settings: UpdateSettingsPayload) => {
    dispatchAppState(updateSettingsAC(settings));
  };

  const setErrorHandler = (payload: UpdateErrorPayload) => {
    dispatchAppState(updateErrorAC(payload));
  };

  const setCountHandler = (counter: number) => {
    dispatchAppState(updateCounterAC({ counter }));
  };

  useEffect(() => {
    //First we should wait until read data from localStorage
    if (isInitializedStorage) {
      dispatchAppState(
        initAppStateAC({
          min: storage.min,
          max: storage.max,
          step: storage.step,
          counter: storage.min,
          isInitialized: true,
        })
      );
    }
  }, [isInitializedStorage]);

  return (
    <>
      {appState.isInitialized && (
        <Box sx={s.appContainer}>
          <Container sx={s.counterContainer}>
            <Grid container spacing={4} sx={s.gridContainer}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Settings
                  appState={appState}
                  setSettings={setSettingsHandler}
                  saveSettings={saveSettingsHandler}
                  setError={setErrorHandler}
                />
              </Grid>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Counter appState={appState} setCount={setCountHandler} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};
