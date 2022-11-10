import axios from "axios";
import localStorageService from "./localStorageService";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIRE_BASE_KEY,
  },
});

const authService = {
  logIn: async (payload) => {
    const { data } = await httpAuth.post(
      "accounts:signInWithPassword",
      payload
    );
    localStorageService.setTokens(data);
    return data;
  },
  register: async (payload) => {
    const { data } = await httpAuth.post("accounts:signUp", payload);
    localStorageService.setTokens(data);
    return data;
  },
};

export default authService;
