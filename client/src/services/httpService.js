import axios from "axios";
import config from "../config.json";
import authService from "./authService";
import localStorageService from "./localStorageService";

const http = axios.create({ baseURL: config.apiEndpoint });

http.interceptors.request.use(
  async function (config) {
    const isExpired =
      localStorageService.getRefreshToken() &&
      Number(localStorageService.getTokenExpiresDate()) < Date.now();

    if (isExpired) {
      const data = await authService.refresh(
        localStorageService.getRefreshToken()
      );
      localStorageService.setTokens(data);
    }

    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.params,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  function (error) {
    alert(error);
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
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
