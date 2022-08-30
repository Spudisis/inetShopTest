import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface pages {
  page: string;
  salePageCounter: number;
}

const initialState: pages = {
  page: "like",
  salePageCounter: 0,
};
export const profilePagesSlice = createSlice({
  name: "classChange",
  initialState,
  reducers: {
    setPageSls: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
    upSalePage: (state) => {
      state.salePageCounter += 4;
    },
    downSalePage: (state) => {
      state.salePageCounter -= 4;
    },
  },
});

export const getPage = (state: RootState) => state.profile;

export const { setPageSls, downSalePage, upSalePage } = profilePagesSlice.actions;

export default profilePagesSlice.reducer;
