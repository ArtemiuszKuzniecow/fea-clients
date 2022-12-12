import { createSlice } from "@reduxjs/toolkit";
import {
  deleteOrderComment,
  loadOrdersCommentsData,
  postOrderComment,
} from "./actions";

const initialState = {
  ordersCommentsData: null,
  isLoading: true,
  error: null,
};

export const OrdersCommentsSlice = createSlice({
  name: "OrdersComments",
  initialState,
  reducers: {
    clearData: (state) => {
      state.ordersCommentsData = null;
      state.isLoading = true;
      state.error = null;
    },
  },
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

    [postOrderComment.pending.type]: (state) => {
      state.isLoading = true;
    },
    [postOrderComment.fulfilled.type]: (state, { payload }) => {
      state.ordersCommentsData = [...state.ordersCommentsData, payload];
      state.isLoading = false;
    },
    [postOrderComment.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [deleteOrderComment.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteOrderComment.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.ordersCommentsData = state.ordersCommentsData.filter(
        (item) => item._id !== payload
      );
    },
    [deleteOrderComment.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
