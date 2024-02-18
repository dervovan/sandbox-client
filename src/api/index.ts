import axios from "axios";
import { IPostParams, IRefreshTokenResponse } from "./types";

const BASE_URL = "http://localhost:3333/api/";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "access_token"
)}`;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const refreshToken = () => axios.post<unknown,IRefreshTokenResponse>(`${BASE_URL}/auth/refreshTokens`);

// axios.interceptors.request.use(
//   config => {
//     config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status == 401) {
      let { access_token } = await refreshToken();
      localStorage.setItem('access_token', access_token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return api(error.config);
    }
  }
);

const get = (url: string) => {
  return axios.get(url);
};
const post = (params: IPostParams) => {
  return axios.post(params.url, params.data);
};
const del = (url: string) => {
  return axios.delete(url);
};

export default {
  get,
  post,
  del,
};
