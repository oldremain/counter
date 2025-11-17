import type { Settings } from "@common/types";

export const DEFAULT_SETTINGS = {
  min: 0,
  max: 5,
  step: 1,
};

export const LOCAL_STORAGE_KEY = "minmax";

export const validateMax = (v: Settings) =>
  v.max.toString() !== "" && v.max > 0 && v.max > v.min;

export const validateMin = (v: Settings) =>
  v.min.toString() !== "" && v.min >= 0 && v.min < v.max;

export const validateStep = (v: Settings) =>
  v.step.toString() !== "" && v.step > 0 && v.min + v.step <= v.max;

export const validateSettings = (v: Settings) =>
  validateMax(v) && validateMin(v) && validateStep(v);
