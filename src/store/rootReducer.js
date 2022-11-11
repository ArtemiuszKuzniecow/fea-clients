import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { LeadsSlice } from "./Leads/reducer";
import { LeadsCommentsSlice } from "./LeadsComments/reducer";
import { OrdersSlice } from "./Orders/reducer";
import { UserSlice } from "./Users/reducer";

const rootReducer = combineReducers({
  userData: UserSlice.reducer,
  leadData: LeadsSlice.reducer,
  orderData: OrdersSlice.reducer,
  leadsCommentData: LeadsCommentsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
