import { createAsyncThunk } from "@reduxjs/toolkit";
import ordersService from "../../services/ordersService";

export const loadOrdersData = createAsyncThunk(
  "order/loadOrder",
  async (id, thunkApi) => {
    try {
      const { content } = await ordersService.get();

      return content.filter((item) => item.userID === id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postNewOrder = createAsyncThunk(
  "newOrder/created",
  async (payload, thunkAPI) => {
    try {
      const { content } = await ordersService.postNewOrder(payload);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editOrderParameter = createAsyncThunk(
  "order/paramEdited",
  async (orderPayload, thunkAPI) => {
    const { payload, id, parameter } = orderPayload;
    try {
      const { content } = await ordersService.editOrderParam(
        id,
        parameter,
        payload
      );
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleted",
  async (orderPayload, thunkAPI) => {
    try {
      const { content } = await ordersService.removeOrder(orderPayload);
      return orderPayload._id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
