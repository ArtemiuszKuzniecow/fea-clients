import { createSlice } from "@reduxjs/toolkit";
import {
  deleteLead,
  editLeadParameter,
  loadLeadsData,
  postNewLead,
} from "./actions";

const initialState = {
  leadData: null,
  isLoading: true,
  error: null,
};

export const LeadsSlice = createSlice({
  name: "Lead",
  initialState,
  reducers: {
    clearData: (state) => {
      state.leadData = null;
      state.isLoading = true;
      state.error = null;
    },
  },
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

    [postNewLead.pending.type]: (state) => {
      state.isLoading = true;
    },
    [postNewLead.fulfilled.type]: (state, { payload }) => {
      state.leadData = { ...state.leadData, [payload._id]: payload };
      state.isLoading = false;
    },
    [postNewLead.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [editLeadParameter.pending.type]: (state) => {
      state.isLoading = true;
    },
    [editLeadParameter.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.leadData = {
        ...state.leadData,
        [payload.id]: {
          ...state.leadData[payload._id],
          [payload.parameter]: payload.content,
        },
      };
    },
    [editLeadParameter.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [deleteLead.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteLead.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      delete state.leadData[payload];
    },
    [deleteLead.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
