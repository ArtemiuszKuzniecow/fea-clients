import { createAsyncThunk } from "@reduxjs/toolkit";
import leadService from "../../assets/services/leadService";

export const loadLeadsData = createAsyncThunk(
  "lead/loadLead",
  async (thunkApi) => {
    try {
      const { content } = await leadService.get();
      return content;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
