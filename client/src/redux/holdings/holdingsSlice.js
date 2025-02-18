// redux/holdings/holdingsSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  holdings: [],
  totalValue: 0,
  investedValue: 0,
  loading: false,
  error: null,
};

const holdingsSlice = createSlice({
  name: "holdings",
  initialState,
  reducers: {
    fetchHoldingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchHoldingsSuccess: (state, action) => {
      state.holdings = action.payload.stocks;
      state.totalValue = action.payload.totalValue;
      state.investedValue = action.payload.totalInvestedValue;
      state.loading = false;
    },
    fetchHoldingsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateHoldingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateHoldingsSuccess: (state, action) => {
      state.holdings = action.payload.stocks;
      state.totalValue = action.payload.totalValue;
      state.investedValue = action.payload.totalInvestedValue;
      state.loading = false;
    },
    updateHoldingsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchHoldingsStart,
  fetchHoldingsSuccess,
  fetchHoldingsFailure,
  updateHoldingsStart,
  updateHoldingsSuccess,
  updateHoldingsFailure,
} = holdingsSlice.actions;

export const fetchHoldings = (userId) => async (dispatch) => {
  dispatch(fetchHoldingsStart());
  try {
    const response = await axios.get(`/api/holdings/${userId}`);
    dispatch(fetchHoldingsSuccess(response.data));
  } catch (error) {
    dispatch(fetchHoldingsFailure(error.message));
  }
};

export const addOrUpdateStock = (payload) => async (dispatch) => {
  dispatch(updateHoldingsStart());
  try {
    await axios.post("/api/holdings/addOrUpdate",payload);
    
    const response = await axios.get(`/api/holdings/${payload.userId}`);
    dispatch(updateHoldingsSuccess(response.data));
  } catch (error) {
    dispatch(updateHoldingsFailure(error.message));
  }
};

export const removeStock = (userId, stockName) => async (dispatch) => {
  dispatch(updateHoldingsStart());
  try {
    await axios.post("/api/holdings/remove", { userId, stockName });
    const response = await axios.get(`/api/holdings/${userId}`);
    dispatch(updateHoldingsSuccess(response.data));
  } catch (error) {
    dispatch(updateHoldingsFailure(error.message));
  }
};

export default holdingsSlice.reducer;
