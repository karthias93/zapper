import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";
import { coinSlice } from "./coinSlice";
import { transactionSlice } from "./transactionSlice";
import { createWrapper } from "next-redux-wrapper";
import { userSlice } from "./userSlice";
import { priceSlice } from "./priceSlice";
import { sidebarSlice } from "./sidebarSlice";
import { protocolSlice } from "./protocolSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [themeSlice.name]: themeSlice.reducer,
      [sidebarSlice.name]: sidebarSlice.reducer,
      [coinSlice.name]: coinSlice.reducer,
      [transactionSlice.name]: transactionSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [priceSlice.name]: priceSlice.reducer,
      [protocolSlice.name]: protocolSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
