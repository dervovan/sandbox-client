import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Role = "ADMIN" | "USER" | '';

export interface IUser {
  firstName: string,
  lastName: string,
  email: string;
  role: Role[];
}

export interface IAuthState {
  isAuthorized: boolean;
  isFetched: boolean;
  userData: IUser | null;
}

const initialState: IAuthState = {
  isAuthorized: false,
  isFetched: false,
  userData: {
    email: '',
    firstName: '',
    lastName: '',
    role: []
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.isFetched = true
      if (action.payload?.email) {
        state.userData = action.payload;
        state.isAuthorized = true;
      } 
    },
    logout: (state) => {
      state.isAuthorized = false;
      state.userData = null
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectUser = (state: RootState): IAuthState => state.auth;

export default authSlice.reducer;
