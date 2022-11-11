import { createSlice } from "@reduxjs/toolkit";
import { loadOrdersData } from "./actions";

const initialState = {
  orderData: null,
  isLoading: true,
  error: null,
};

export const OrdersSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},
  extraReducers: {
    [loadOrdersData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loadOrdersData.fulfilled.type]: (state, { payload }) => {
      state.orderData = payload;
      state.isLoading = false;
    },
    [loadOrdersData.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});
