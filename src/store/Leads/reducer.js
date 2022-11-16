import { createSlice } from "@reduxjs/toolkit";
import { editLeadParameter, loadLeadsData, postNewLead } from "./actions";

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

    [postNewLead.pending.type]: (state) => {
      state.isLoading = true;
    },
    [postNewLead.fulfilled.type]: (state, { payload }) => {
      state.leadData = { ...state.leadData, [payload.id]: payload };
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
          ...state.leadData[payload.id],
          [payload.parameter]: payload.content,
        },
      };
    },
  },
});
