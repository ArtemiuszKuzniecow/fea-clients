import axios from "axios";
import config from "../../config.json";
import { httpAuth } from "../services/authService";
import localStorageService from "./localStorageService";

const http = axios.create({ baseURL: config.apiEndpoint });

http.interceptors.request.use(
  async function (config) {
    const containsSlash = /\/$/gi.test(config.url);
    config.url =
      (containsSlash ? config.url.slice(0, -1) : config.url) + ".json";
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    if (refreshToken && expiresDate < Date.now()) {
      const { data } = await httpAuth.post("token", {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });
      localStorageService.setTokens({
        refreshToken: data.refresh_token,
        idToken: data.id_token,
        expiresIn: data.expires_in,
        localId: data.user_id,
      });
    }
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.params = { ...config.params, auth: accessToken };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    res.data = {
      content: res.data,
    };
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      alert("Something was wrong. Try it later");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
};

export default httpService;
