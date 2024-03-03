import axios, { AxiosError, AxiosResponse } from "axios";
import { IPostParams, IRefreshTokenResponse } from "./types";

const BASE_URL = "http://localhost:5000";
const refreshTokensUrl = "/auth/refresh";
export const SUGNIN_URL = "/auth/signin";
export const SUGNUP_URL = "/auth/signup";
export const LOGOUT_URL = "/auth/logout";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "access_token"
)}`;

// axios.interceptors.request.use(
//   config => {
//     config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

api.interceptors.response.use(
  (response) => {
    if ([SUGNIN_URL, SUGNUP_URL].includes(response?.config?.url || "")) {
      localStorage.setItem("access_token", response?.data?.access_token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.data?.access_token}`;
    }
    if ([LOGOUT_URL].includes(response?.config?.url || "")) {
      localStorage.removeItem("access_token");
      api.defaults.headers.common["Authorization"] = ``;
    }
    return response;
  },
  async (error) => {
    if (
      error?.response?.status === 401 &&
      error.config.url !== refreshTokensUrl &&
      !error.config._retry
    ) {
      error.config._retry = true;
      const { data } = await api.post<string>(refreshTokensUrl);
      if (data) {
        localStorage.setItem("access_token", data);
        api.defaults.headers.common["Authorization"] = "Bearer " + data;
        error.config.headers["Authorization"] = "Bearer " + data;
        return api.request(error.config);
      }
    }
    return error;
  }
);

const get = async <T>(
  url: string
): Promise<AxiosError<T> & AxiosResponse<T>> => {
  const result = (await api.get<T>(url)) as AxiosError<T> & AxiosResponse<T>;
  return result;
};

const post = async <T>(
  params: IPostParams
): Promise<AxiosError<T> & AxiosResponse<T>> => {
  const result = (await api.post<T>(params.url, params.data)) as AxiosError<T> &
    AxiosResponse<T>;
  return result;
};

const del = async (url: string) => {
  const result = await api.delete(url);
  return result;
};

export default {
  get,
  post,
  del,
};
