import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";

const initialState = {
  isLoading: false,
  isError: false,
  answer: "",
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(translateText.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
      state.answer = payload; // API'den dönen çeviri sonucu burada saklanır
    });
    builder.addCase(translateText.rejected, (state, { error }) => {
      state.isLoading = false;
      state.isError = true;
      console.error("Translation error:", error.message);
    });
  },
});

export default translateSlice.reducer;
