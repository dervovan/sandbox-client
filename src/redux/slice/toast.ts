import { SnackbarOrigin } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export interface SnackbarMessage {
  message: string;
  key: number;
}

interface Toast extends SnackbarOrigin, SnackbarMessage {
}

interface ToastState {
  toasts: Array<Toast>;
}

const initialState: ToastState = {
  toasts: []
}

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToastMessage: (state, action: PayloadAction<Toast>) => {
      state.toasts = [...state.toasts, action.payload];
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    closeToast: (state, action : PayloadAction<string | number>) => {
      state.toasts = state.toasts.filter(t => t.key !== action.payload);
    },
  },
});

export const selectToasts = (state: RootState): Toast[] => state.toasts.toasts;

export const { addToastMessage, clearToasts, closeToast } = toastSlice.actions;
export default toastSlice.reducer;