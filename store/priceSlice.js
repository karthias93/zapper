import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  priceState: [],
};

export const fetchPriceList = createAsyncThunk(
    "price/fetchPriceList", async ({id, network, timeFrame, currency="USD"}, thunkAPI) => {
       try {
            const response = await axios.get(`${process.env.zapperApi}/prices/${id}?network=${network}&timeFrame=${timeFrame}&currency=${currency}`);
            thunkAPI.dispatch(setPriceState(response.data));
        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
});

export const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {

    setPriceState(state, action) {
      state.priceState = action.payload;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
      [fetchPriceList.fulfilled]: (state, { payload }) => {
        state.priceState = payload
      },
    },

  },
});

export const { setPriceState } = priceSlice.actions;

export const selectPriceState = (state) => state.price.priceState;

export default priceSlice.reducer;
