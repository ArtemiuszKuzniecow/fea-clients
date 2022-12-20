import axios from "axios";
import localStorageService from "./localStorageService";
import config from "../config.json";

export const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "/auth/",
});

const authService = {
  logIn: async (payload) => {
    const { data } = await httpAuth.post("signInWithPassword", payload);
    localStorageService.setTokens(data);
    return data;
  },
  register: async (payload) => {
    const { data } = await httpAuth.post("signUp", payload);
    localStorageService.setTokens(data);
    return data;
  },
  refresh: async (refresh) => {
    const { data } = await httpAuth.post("/token", {
      refreshToken: refresh,
    });
    return data;
  },
};

export default authService;
