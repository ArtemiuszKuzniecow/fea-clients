import { createSlice } from "@reduxjs/toolkit";
import {
  deleteOrder,
  editOrderParameter,
  loadOrdersData,
  postNewOrder,
} from "./actions";

const initialState = {
  orderData: null,
  isLoading: true,
  error: null,
};

export const OrdersSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    clearData: (state) => {
      state.orderData = null;
      state.isLoading = true;
      state.error = null;
    },
  },
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

    [postNewOrder.pending.type]: (state) => {
      state.isLoading = true;
    },
    [postNewOrder.fulfilled.type]: (state, { payload }) => {
      state.orderData = { ...state.orderData, [payload._id]: payload };
      state.isLoading = false;
    },
    [postNewOrder.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [editOrderParameter.pending.type]: (state) => {
      state.isLoading = true;
    },
    [editOrderParameter.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.orderData = {
        ...state.orderData,
        [payload._id]: {
          ...state.orderData[payload._id],
          [payload.parameter]: payload.content,
        },
      };
    },
    [editOrderParameter.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [deleteOrder.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteOrder.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      delete state.orderData[payload];
    },
    [deleteOrder.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
