import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const initialState = {
  coinState: [],
};

export const fetchCoins = createAsyncThunk(
    "coin/fetchCoins", async (id, thunkAPI) => {
       try {
            await fetchEventSource(`https://web.zapper.fi/v2/balances?addresses%5B0%5D=${id}&networks%5B0%5D=ethereum&networks%5B1%5D=polygon&networks%5B2%5D=optimism&networks%5B3%5D=gnosis&networks%5B4%5D=binance-smart-chain&networks%5B5%5D=fantom&networks%5B6%5D=avalanche&networks%5B7%5D=arbitrum&networks%5B8%5D=celo&networks%5B9%5D=harmony&networks%5B10%5D=moonriver&networks%5B11%5D=bitcoin&networks%5B12%5D=cronos&networks%5B13%5D=aurora&networks%5B14%5D=evmos&nonNilOnly=true&useNewBalancesFormat=true&useNftService=true`, {
                method: "GET",
                headers: {
                  Accept: "text/event-stream",
                },
                onopen(res) {
                  if (res.ok && res.status === 200) {
                    thunkAPI.dispatch(setCoinState([]));
                  } else if (
                    res.status >= 400 &&
                    res.status < 500 &&
                    res.status !== 429
                  ) {
                    console.log("Client side error ", res);
                  }
                },
                onmessage(event) {
                  const parsedData = JSON.parse(event.data);
                  const balanceDetails = thunkAPI.getState().coin.coinState;
                  thunkAPI.dispatch(setCoinState([...balanceDetails, parsedData]));
                },
                onclose() {
                  console.log("Connection closed by the server");
                },
                onerror(err) {
                  console.log("There was an error from server", err);
                },
              });
        } catch (error) {
            console.log(error, 'ssss')
           return thunkAPI.rejectWithValue({ error: error.message });
        }
});

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {

    setCoinState(state, action) {
      state.coinState = action.payload;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
      [fetchCoins.fulfilled]: (state, { payload }) => {
        state.coinState = payload
      },
    },

  },
});

export const { setCoinState } = coinSlice.actions;

export const selectCoinState = (state) => state.coin.coinState;

export default coinSlice.reducer;
