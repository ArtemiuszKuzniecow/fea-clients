import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "../../assets/services/commentsService";

export const loadOrdersCommentsData = createAsyncThunk(
  "odrersComments/loadOrdersComments",
  async (thunkApi) => {
    try {
      const { content } = await commentsService.getOrdersComments();
      return content;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
