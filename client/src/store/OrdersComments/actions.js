import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsService, {
  ordersCommentsEndpoint,
} from "../../services/commentsService";

export const loadOrdersCommentsData = createAsyncThunk(
  "ordersComment/loadOrdersComment",
  async (id, thunkApi) => {
    try {
      console.log(new Date().toUTCString());
      const { content } = await commentsService.getOrdersComments();
      const result = content && content.filter((item) => item.userID === id);
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postOrderComment = createAsyncThunk(
  "ordersComment/created",
  async (commentsPayload, thunkAPI) => {
    try {
      const { content } = await commentsService.postOrderComment(
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
