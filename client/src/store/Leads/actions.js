import { createAsyncThunk } from "@reduxjs/toolkit";
import leadService from "../../services/leadService";

export const loadLeadsData = createAsyncThunk(
  "lead/loadLead",
  async (id, thunkApi) => {
    try {
      const { content } = await leadService.get();
      const result = {};
      for (const key in content) {
        if (content[key].userID === id) {
          result[key] = content[key];
        }
      }
      return result;
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

export const deleteLead = createAsyncThunk(
  "lead/deleted",
  async (leadPayload, thunkAPI) => {
    try {
      const { content } = await leadService.removeLead(leadPayload);
      return leadPayload.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
