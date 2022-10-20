import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";
import { coinSlice } from "./coinSlice";
import { transactionSlice } from "./transactionSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [themeSlice.name]: themeSlice.reducer,
      [coinSlice.name]: coinSlice.reducer,
      [transactionSlice.name]: transactionSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
