import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [themeSlice.name]: themeSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
