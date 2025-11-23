import type { AppState } from "@/common/types";

export const DEFAULT_APP_STATE: AppState = {
  min: 0,
  max: 5,
  step: 1,
  counter: 0,
  error: false,
  activeSheet: "counter",
  isInitialized: false,
};

export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "update_settings": {
      return {
        ...state,
        ...action.payload,
        activeSheet: "settings",
      };
    }
    case "update_status": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "update_counter": {
      return {
        ...state,
        ...action.payload,
        activeSheet: "counter",
      };
    }
    case "init_app_state": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

//#region SettingsAC
export type UpdateSettingsPayload = Partial<
  Pick<AppState, "min" | "max" | "step">
>;

export const updateSettingsAC = (payload: UpdateSettingsPayload) => {
  return {
    type: "update_settings",
    payload,
  } as const;
};

export type UpdateSettingsAction = ReturnType<typeof updateSettingsAC>;
//#endregion

//#region StatusAC
export type UpdateErrorPayload = Pick<AppState, "error">;

export const updateErrorAC = (payload: UpdateErrorPayload) => {
  return {
    type: "update_status",
    payload,
  } as const;
};

export type UpdateErrorAction = ReturnType<typeof updateErrorAC>;
//#endregion

//#region CounterAC
export const updateCounterAC = (payload: Pick<AppState, "counter">) => {
  return {
    type: "update_counter",
    payload,
  } as const;
};

export type UpdateCounterAction = ReturnType<typeof updateCounterAC>;
//#endregion

//#region InitAC
export const initAppStateAC = (
  payload: Omit<AppState, "error" | "activeSheet">
) => {
  return {
    type: "init_app_state",
    payload,
  } as const;
};

export type InitAppStateAction = ReturnType<typeof initAppStateAC>;
//#endregion

type Action =
  | UpdateSettingsAction
  | UpdateErrorAction
  | UpdateCounterAction
  | InitAppStateAction;
