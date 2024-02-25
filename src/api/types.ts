import { Role } from "../redux/slice/auth";

export interface IPostParams {
  url: string;
  data?: object;
}

export interface IRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}
export interface IAuthResponse extends IRefreshTokenResponse {
  email: string;
  roles: Role[];
}
