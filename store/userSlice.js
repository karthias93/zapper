import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  userState: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUserState(state, action) {
      state.userState = {
        ...state.userState,
        ...action.payload
      }
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

export const { setUserState } = userSlice.actions;

export const selectUserState = (state) => state.user.userState;

export default userSlice.reducer;
