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
