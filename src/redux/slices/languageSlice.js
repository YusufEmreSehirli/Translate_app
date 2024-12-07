import { createSlice } from "@reduxjs/toolkit";
import { getLaguages } from "../actions";

const initialState = {
  isLoading: false,
  error: false,
  laguages: [],
};

const languageSlice = createSlice({
  name: "language",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLaguages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLaguages.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });

    builder.addCase(getLaguages.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.languages = payload;
    });
  },
});

export default languageSlice.reducer;
