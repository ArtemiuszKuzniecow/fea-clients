import { createSlice } from "@reduxjs/toolkit";
import { loadOrdersCommentsData } from "./actions";

const initialState = {
  ordersCommentsData: null,
  isLoading: true,
  error: null,
};

export const OrdersCommentsSlice = createSlice({
  name: "OrdersComments",
  initialState,
  reducers: {},
  extraReducers: {
    [loadOrdersCommentsData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loadOrdersCommentsData.fulfilled.type]: (state, { payload }) => {
      state.ordersCommentsData = payload;
      state.isLoading = false;
    },
    [loadOrdersCommentsData.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});
