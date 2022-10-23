import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  sidebarState: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {

    setSidebarState(state, action) {
      console.log(action.payload)
      state.sidebarState = action.payload;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
        };
      },
    },

  },
});

export const { setSidebarState } = sidebarSlice.actions;

export const selectSidebarState = (state) => state.sidebar.sidebarState;

export default sidebarSlice.reducer;
