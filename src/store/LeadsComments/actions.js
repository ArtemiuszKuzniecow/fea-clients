import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsService, {
  leadsCommentsEndpoint,
} from "../../services/commentsService";

export const loadLeadsCommentsData = createAsyncThunk(
  "leadsComment/loadleadsComment",
  async (thunkApi) => {
    try {
      const { content } = await commentsService.getLeadsComments();
      return content;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postCompanyComment = createAsyncThunk(
  "leadComment/created",
  async (commentsPayload, thunkAPI) => {
    try {
      const { content } = await commentsService.putLeadComment(commentsPayload);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCompanyComment = createAsyncThunk(
  "leadComment/deleted",
  async (payload, thunkAPI) => {
    try {
      const { content } = await commentsService.removeComment(
        payload,
        leadsCommentsEndpoint
      );
      return payload._id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
