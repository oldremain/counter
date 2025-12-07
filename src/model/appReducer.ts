import type { AppState } from "@/common/types";
import { createAction, createReducer } from "@reduxjs/toolkit";

export const DEFAULT_APP_STATE: AppState = {
  min: 0,
  max: 5,
  step: 1,
  counter: 0,
  error: false,
  activeSheet: "counter",
  isInitialized: false,
};

export const updateSettingsAC = createAction<
  Partial<Pick<AppState, "min" | "max" | "step">>
>("appState/updateSettings");

export type UpdateSettingsPayload = Parameters<typeof updateSettingsAC>[0];

export const setErrorAC =
  createAction<Pick<AppState, "error">>("appState/setError");

export type SetErrorPayload = Parameters<typeof setErrorAC>[0];

export const updateCounterAC = createAction<Pick<AppState, "counter">>(
  "appState/updateCounter"
);

export const initAppStateAC =
  createAction<Omit<AppState, "error" | "activeSheet">>("appState/init");

export const appReducer = createReducer(DEFAULT_APP_STATE, (builder) => {
  builder
    .addCase(updateSettingsAC, (state, { payload }) => {
      return {
        ...state,
        ...payload,
        activeSheet: "settings",
      };
    })
    .addCase(setErrorAC, (state, { payload }) => {
      state.error = payload.error;
    })
    .addCase(updateCounterAC, (state, { payload }) => {
      state.counter = payload.counter;
      state.activeSheet = "counter";
    })
    .addCase(initAppStateAC, (state, { payload }) => {
      return {
        ...state,
        ...payload,
        activeSheet: "counter",
      };
    });
});
