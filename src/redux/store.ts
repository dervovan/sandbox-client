import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import errorReducer from "./slice/error";
import ToastState from "./slice/toast";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    toasts: ToastState
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
