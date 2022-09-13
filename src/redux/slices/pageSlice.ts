import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface pages {
  page: string;
  salePageCounter: number;
  catalogPageCounter: number;
  pageLocation: string;
  beforePage: string;
}

const initialState: pages = {
  page: "like",
  salePageCounter: 0,
  catalogPageCounter: 0,
  pageLocation: "/",
  beforePage: "",
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
    upCatalogPage: (state) => {
      state.catalogPageCounter += 6;
    },
    downCatalogPage: (state) => {
      state.catalogPageCounter -= 6;
    },
    clearCatalogPage: (state) => {
      state.catalogPageCounter = 0;
    },
    setPageLocation: (state, action: PayloadAction<string>) => {
      state.pageLocation = action.payload;
    },
    setBeforePage: (state, action: PayloadAction<string>) => {
      state.beforePage = action.payload;
    },
  },
});

export const getPage = (state: RootState) => state.pages;

export const {
  setPageSls,
  downSalePage,
  upSalePage,
  upCatalogPage,
  downCatalogPage,
  clearCatalogPage,
  setPageLocation,
  setBeforePage,
} = profilePagesSlice.actions;

export default profilePagesSlice.reducer;
