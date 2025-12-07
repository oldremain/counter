export type AppState = {
  min: number;
  max: number;
  step: number;
  counter: number;
  error: boolean;
  activeSheet: ActiveSheet;
  isInitialized: boolean;
};

export type ActiveSheet = "settings" | "counter";

export type UpdateSettingsPayload = {
  key: "max" | "min" | "step";
  value: number;
};
