import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../../assets/services/localStorageService";
import { loadUserData, logIn, signUp } from "./actions";

const initialState = localStorageService.getAccessToken()
  ? {
      userData: null,
      isLoading: true,
      errors: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
      clientsStatusFilter: null,
      contactDateFilter: null,
      openedClosedOrdersFilter: null,
      orderDateFilter: null,
    }
  : {
      userData: null,
      isLoading: false,
      errors: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
      clientsStatusFilter: null,
      contactDateFilter: null,
      openedClosedOrdersFilter: null,
      orderDateFilter: null,
    };

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    clearData: (state) => {
      state.userData = null;
      state.isLoading = false;
      state.errors = null;
      state.auth = null;
      state.isLoggedIn = false;
      state.dataLoaded = false;
      state.clientsStatusFilter = null;
      state.contactDateFilter = null;
      state.openedClosedOrdersFilter = null;
      state.orderDateFilter = null;
    },
    setClientsStatus: (state, { payload }) => {
      state.clientsStatusFilter = payload;
    },
    setContactDate: (state, { payload }) => {
      state.contactDateFilter = payload;
    },
  },
  extraReducers: {
    [loadUserData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loadUserData.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.userData = payload;
    },
    [loadUserData.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.errors = payload;
    },

    [logIn.pending.type]: (state) => {
      state.isLoading = true;
      state.auth = null;
      state.isLoggedIn = false;
    },
    [logIn.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.auth = { userId: localStorageService.getUserId() };
      state.isLoggedIn = true;
      state.errors = null;
    },
    [logIn.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.auth = null;
      state.isLoggedIn = false;
      state.errors = payload;
    },

    [signUp.pending.type]: (state) => {
      state.isLoading = true;
      state.auth = null;
      state.isLoggedIn = false;
    },
    [signUp.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.auth = { userId: localStorageService.getUserId() };
      state.isLoggedIn = true;
      state.errors = null;
    },
    [signUp.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.auth = null;
      state.isLoggedIn = false;
      state.errors = payload;
    },
  },
});
