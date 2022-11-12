import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "../../assets/services/commentsService";

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
    const { payload, array, companyId } = commentsPayload;
    try {
      const data = await commentsService.postLeadComment(
        payload,
        array,
        companyId
      );
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
