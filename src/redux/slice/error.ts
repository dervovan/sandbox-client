import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  error: Error | null;
}

const initialState: ErrorState = {
  error: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;