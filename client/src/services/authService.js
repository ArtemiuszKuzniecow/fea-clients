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
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
