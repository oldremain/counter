import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "@/model/appReducer";

export const store = configureStore({
  reducer: {
    appState: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store;
