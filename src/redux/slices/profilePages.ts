import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  page: "like",
};
export const profilePagesSlice = createSlice({
  name: "classChange",
  initialState,
  reducers: {
    setPageSls: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
  },
});

export const getPage = (state: RootState) => state.profile

export const { setPageSls } = profilePagesSlice.actions;

export default profilePagesSlice.reducer;
