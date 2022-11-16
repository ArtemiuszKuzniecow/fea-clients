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

export const postNewLead = createAsyncThunk(
  "newLead/created",
  async (payload, thunkAPI) => {
    try {
      const { content } = await leadService.putNewLead(payload);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editLeadParameter = createAsyncThunk(
  "lead/paramEdited",
  async (leadPayload, thunkAPI) => {
    const { payload, id, parameter } = leadPayload;
    try {
      const { content } = await leadService.editLeadParam(
        id,
        parameter,
        payload
      );
      return { content, id: id, parameter: parameter };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
