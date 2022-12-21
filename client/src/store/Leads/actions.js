import { createAsyncThunk } from "@reduxjs/toolkit";
import leadService from "../../services/leadService";

export const loadLeadsData = createAsyncThunk(
  "lead/loadLead",
  async (id, thunkApi) => {
    try {
      const { content } = await leadService.get();
      return content.filter((item) => item.userID === id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postNewLead = createAsyncThunk(
  "newLead/created",
  async (payload, thunkAPI) => {
    try {
      const { content } = await leadService.postNewLead(payload);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editLeadParameter = createAsyncThunk(
  "lead/paramEdited",
  async (leadPayload, thunkAPI) => {
    const { payload, _id, parameter } = leadPayload;
    try {
      const { content } = await leadService.editLeadParam(
        _id,
        parameter,
        payload
      );
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editLead = createAsyncThunk(
  "lead/edited",
  async (leadPayload, thunkAPI) => {
    try {
      const { content } = await leadService.editLead(leadPayload);
      return content;
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
      return leadPayload._id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
