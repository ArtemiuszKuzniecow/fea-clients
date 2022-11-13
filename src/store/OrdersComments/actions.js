import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsService, {
  ordersCommentsEndpoint,
} from "../../assets/services/commentsService";

export const loadOrdersCommentsData = createAsyncThunk(
  "ordersComment/loadOrdersComment",
  async (thunkApi) => {
    try {
      const { content } = await commentsService.getOrdersComments();
      return content;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postOrderComment = createAsyncThunk(
  "ordersComment/created",
  async (commentsPayload, thunkAPI) => {
    try {
      const { content } = await commentsService.putOrderComment(
        commentsPayload
      );
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteOrderComment = createAsyncThunk(
  "ordersComment/deleted",
  async (payload, thunkAPI) => {
    try {
      const { content } = await commentsService.removeComment(
        payload,
        ordersCommentsEndpoint
      );
      return payload._id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
