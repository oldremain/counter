import type { RootState } from "@/app/store";
import type { AppState } from "@/common/types";

export const selectAppState = (state: RootState): AppState => state.appState;
