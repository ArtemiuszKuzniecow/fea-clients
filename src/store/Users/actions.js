import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../assets/services/authService";
import userService from "../../assets/services/userService";

export const loadUserData = createAsyncThunk(
  "user/loadUser",
  async (id, thunkApi) => {
    try {
      const { content } = await userService.get(id);
      return content;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.logIn({
        email,
        password,
        returnSecureToken: true,
      });
      return data;
    } catch (error) {
      const { code, message } = error.response.data.error;
      let errorMessage;
      if (code === 400) {
        const invalidEmail = {
          error: { message: "Неверная электронная почта или пароль" },
        };
        const invalidPassword = {
          error: { message: "Неверный электронная почта или пароль" },
        };
        const blockedUser = {
          error: { message: "Даннный пользователь заблокирован." },
        };
        if (message === "EMAIL_NOT_FOUND") {
          errorMessage = invalidEmail;
        } else if (message === "INVALID_PASSWORD") {
          errorMessage = invalidPassword;
        } else if (message === "USER_DISABLED") {
          errorMessage = blockedUser;
        }
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ email, password, ...rest }, thunkAPI) => {
    try {
      const data = await authService.register({
        email,
        password,
        returnSecureToken: true,
      });
      const { content } = await userService.create({
        id: data.localId,
        ...rest,
      });
      const result = await authService.logIn({
        email,
        password,
        returnSecureToken: true,
      });

      return result;
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          return thunkAPI.rejectWithValue({
            error: {
              message: "Пользователь с таким E-mail уже существует",
            },
          });
        }
      }
    }
  }
);
