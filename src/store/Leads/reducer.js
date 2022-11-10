import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leadData: null,
  isLoading: true,
  error: null,
};

export const LeadsSlice = createSlice({
  name: "Lead",
  initialState,
  reducers: {},
  extraReducers: {},
});
