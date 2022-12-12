import { createSlice } from "@reduxjs/toolkit";
import {
  deleteLead,
  editLead,
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
      state.leadData = [...state.leadData, payload];
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
      state.leadData = state.leadData.map((item) =>
        item._id === payload._id ? payload : item
      );
    },
    [editLeadParameter.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [editLeadParameter.pending.type]: (state) => {
      state.isLoading = true;
    },
    [editLeadParameter.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.leadData = state.leadData.map((item) =>
        item._id === payload._id ? payload : item
      );
    },
    [editLeadParameter.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [editLead.pending.type]: (state) => {
      state.isLoading = true;
    },
    [editLead.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.leadData = state.leadData.map((item) =>
        item._id === payload._id ? payload : item
      );
    },
    [editLead.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [deleteLead.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteLead.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.leadData = state.leadData.filter((item) => item._id !== payload);
    },
    [deleteLead.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
