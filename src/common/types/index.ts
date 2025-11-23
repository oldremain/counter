export type AppState = {
  min: number;
  max: number;
  step: number;
  counter: number;
  error: boolean;
  activeSheet: Sheet;
  isInitialized: boolean;
};

export type Sheet = "settings" | "counter";

export type UpdateSettingsPayload = {
  key: "max" | "min" | "step";
  value: number;
};
