import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  themeState: 'light',
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {

    setThemeState(state, action) {
      state.themeState = action.payload;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },

  },
});

export const { setThemeState } = themeSlice.actions;

export const selectThemeState = (state) => state.theme.themeState;

export default themeSlice.reducer;
