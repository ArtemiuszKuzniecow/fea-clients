import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCompanyComment,
  loadLeadsCommentsData,
  postCompanyComment,
} from "./actions";

const initialState = {
  leadsCommentData: null,
  isLoading: true,
  error: null,
};

export const LeadsCommentsSlice = createSlice({
  name: "LeadsComment",
  initialState,
  reducers: {},
  extraReducers: {
    [loadLeadsCommentsData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loadLeadsCommentsData.fulfilled.type]: (state, { payload }) => {
      state.leadsCommentData = payload;
      state.isLoading = false;
    },
    [loadLeadsCommentsData.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },

    [postCompanyComment.pending.type]: (state) => {
      state.isLoading = true;
    },
    [postCompanyComment.fulfilled.type]: (state, { payload }) => {
      state.leadsCommentData = {
        ...state.leadsCommentData,
        [payload._id]: payload,
      };
      state.isLoading = false;
    },
    [postCompanyComment.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [deleteCompanyComment.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteCompanyComment.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      delete state.leadsCommentData[payload];
    },
    [deleteCompanyComment.rejected.type]: (state, [payload]) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
