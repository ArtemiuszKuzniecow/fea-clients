import { createAsyncThunk } from "@reduxjs/toolkit";
import ordersService from "../../assets/services/ordersService";

export const loadOrdersData = createAsyncThunk(
  "order/loadOrder",
  async (thunkApi) => {
    try {
      const { content } = await ordersService.get();
      return content;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postNewOrder = createAsyncThunk(
  "newOrder/created",
  async (payload, thunkAPI) => {
    try {
      const { content } = await ordersService.putNewOrder(payload);
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

      return { content, id: id, parameter: parameter };
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
      return orderPayload.orderId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
