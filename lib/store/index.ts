import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";

function getPreloadedState() {
  return {
    ui: {
      isDarkMode:
        typeof window !== "undefined" &&
        localStorage.getItem("theme") === "dark",
      isSidebarOpen: false,
    },
  };
}

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      // notif: notifReducer
    },
    preloadedState: getPreloadedState(),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
