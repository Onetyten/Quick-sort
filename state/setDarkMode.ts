import { createSlice} from "@reduxjs/toolkit";

interface DarkModeState {
  isDark: boolean;
}

const initialState: DarkModeState = {
  isDark: false
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDark = !state.isDark;
    },
    setDarkMode: (state, action) => {
      state.isDark = action.payload;
    }
  }
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
