import type { AppState } from "@/common/types";

export const SETTINGS_STORAGE_KEY = "settings";

export const validateMax = (v: AppState) =>
  v.max?.toString() !== "" && v.max > 0 && v.max > v.min;

export const validateMin = (v: AppState) =>
  v.min?.toString() !== "" && v.min >= 0 && v.min < v.max;

export const validateStep = (v: AppState) =>
  v.step?.toString() !== "" && v.step > 0 && v.min + +v.step <= v.max;

export const validateSettings = (v: AppState) =>
  validateMax(v) && validateMin(v) && validateStep(v);
