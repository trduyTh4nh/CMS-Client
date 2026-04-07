// lib/store/slices/uiSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
}

const initialState: UIState = {
  isDarkMode: false,
  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleDarkMode, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
