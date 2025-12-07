import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  DEFAULT_APP_STATE,
  initAppStateAC,
  updateCounterAC,
  updateSettingsAC,
  setErrorAC,
  type UpdateSettingsPayload,
  type SetErrorPayload,
} from "@/model/appReducer";
import type { AppState } from "@/common/types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useAppStorage } from "@/common/hooks/useAppStorage";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectAppState } from "@/model/appSelector";
import { Settings } from "@/features/settings/Settings";
import { Counter } from "@/features/counter/Counter";
import * as s from "./App.styles";

export const App = () => {
  const [storage, isInitializedStorage, saveToStorage] =
    useAppStorage(DEFAULT_APP_STATE);

  const appState = useAppSelector(selectAppState);
  const dispatch = useDispatch();

  const saveSettingsHandler = (settings: AppState) => {
    dispatch(updateCounterAC({ counter: settings.min }));
    saveToStorage({
      min: settings.min,
      max: settings.max,
      step: settings.step,
    });
  };

  const setSettingsHandler = (settings: UpdateSettingsPayload) => {
    dispatch(updateSettingsAC(settings));
  };

  const setErrorHandler = (payload: SetErrorPayload) => {
    dispatch(setErrorAC(payload));
  };

  const setCountHandler = (counter: number) => {
    dispatch(updateCounterAC({ counter }));
  };

  useEffect(() => {
    //First we should wait until read data from localStorage
    if (isInitializedStorage) {
      dispatch(
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
