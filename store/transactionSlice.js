import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  transactionState: [],
};

export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions", async (id, thunkAPI) => {
       try {
            const response = await axios.get(`https://web.zapper.fi/v2/transactions?addresses[]=${id}&network=binance-smart-chain`);
            thunkAPI.dispatch(setTransactionState(response.data.data));
        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
});

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {

    setTransactionState(state, action) {
      state.transactionState = action.payload;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
      [fetchTransactions.fulfilled]: (state, { payload }) => {
        state.transactionState = payload
      },
    },

  },
});

export const { setTransactionState } = transactionSlice.actions;

export const selectTransactionState = (state) => state.transaction.transactionState;

export default transactionSlice.reducer;
