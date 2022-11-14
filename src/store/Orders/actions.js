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
