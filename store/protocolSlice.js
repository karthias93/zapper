import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  protocolState: {
    detail: {},
    userData: {} 
  },
};

export const fetchProtocol = createAsyncThunk(
    "protocol/fetchProtocol", async (token, thunkAPI) => {
       try {
            //const response = await axios.get(`https://web.zapper.fi/v2/transactions?addresses[]=${id}&network=binance-smart-chain`);
            const response = await axios.get(`https://api.debank.com/project/v2/detail?id=${token}`);
            thunkAPI.dispatch(setProtocolState({detail: response.data.data}));
        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
});
export const fetchProtocolUserList = createAsyncThunk(
  "protocol/fetchProtocolUserList", async (token, thunkAPI) => {
     try {
          const response = await axios.get(`https://api.debank.com/project/portfolios/user_list?id=${token}`);
          thunkAPI.dispatch(setProtocolState({userData: response.data.data}));
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});

export const protocolSlice = createSlice({
  name: "protocol",
  initialState,
  reducers: {

    setProtocolState(state, action) {
      state.protocolState = {
        ...state.protocolState,
        ...action.payload
      };
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
        };
      }
    },

  },
});

export const { setProtocolState } = protocolSlice.actions;

export const selectProtocolState = (state) => state.protocol.protocolState;

export default protocolSlice.reducer;
