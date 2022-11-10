import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "../../assets/services/commentsService";

export const postCompanyComment = createAsyncThunk(
  "comment/created",
  async (commentsPayload, thunkAPI) => {
    const { commentEndpoint, companyEndpoint, prevState, payload } =
      commentsPayload;

    try {
      const data = await commentsService.postNewComment(
        commentEndpoint,
        companyEndpoint,
        prevState,
        payload
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
