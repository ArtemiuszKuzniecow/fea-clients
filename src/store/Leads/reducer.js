import { createSlice } from "@reduxjs/toolkit";
import { postCompanyComment } from "../LeadsComments/actions";
import { loadLeadsData } from "./actions";

const initialState = {
  leadData: null,
  isLoading: true,
  error: null,
};

export const LeadsSlice = createSlice({
  name: "Lead",
  initialState,
  reducers: {},
  extraReducers: {
    [loadLeadsData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loadLeadsData.fulfilled.type]: (state, { payload }) => {
      state.leadData = payload;
      state.isLoading = false;
    },
    [loadLeadsData.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },

    [postCompanyComment.pending.type]: (state) => {
      state.isLoading = true;
    },
    [postCompanyComment.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.leadData = {
        ...state.leadData,
        [payload.companyId.companyComments]: payload.commentsArray,
      };
    },
    [postCompanyComment.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
