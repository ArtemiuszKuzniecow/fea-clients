import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./Users/reducer";

const rootReducer = combineReducers({
  userData: UserSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
