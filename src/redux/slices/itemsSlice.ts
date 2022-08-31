import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { filter } from "../../pages/catalog";
import { RootState } from "../store";

export const fetchProductMock = createAsyncThunk<Item[], filter>(
  `items/fetchItemsProduct`,
  async ({ search, filterBy, ascDesc, type }) => {
    const { data } = await axios.get(
      `https://62f44a7fac59075124bbda32.mockapi.io/clicker?${search ? "name=" + search : type ? "type=" + type : ""}&${
        filterBy !== "" ? "sortBy=" + filterBy : ""
      }&order=${ascDesc}`
    );
    return data;
  }
);

export type Item = {
  class: string;
  count: number;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  sale: number;
  timeSave: number;
  title: string;
  type: string;
  weight: number;
  [key: string]: any;
};
export enum Status {
  LOADING = "loading",
  SUCCESS = "completed",
  ERROR = "error",
}
export interface ItemsType {
  items: Item[];
  itemsDop: Item[];
  loading: Status;
}
const initialState: ItemsType = {
  items: [],
  itemsDop: [],
  loading: Status.LOADING,
};
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.itemsDop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductMock.fulfilled, (state: ItemsType, action) => {
      state.items = action.payload;
      state.itemsDop = action.payload;
      state.loading = Status.SUCCESS;
    });
    builder.addCase(fetchProductMock.pending, (state: ItemsType) => {
      state.items = [];
      state.itemsDop = [];
      state.loading = Status.LOADING;
    });
    builder.addCase(fetchProductMock.rejected, (state: ItemsType) => {
      state.items = [];
      state.itemsDop = [];
      state.loading = Status.ERROR;
    });
  },
});

export const getDataItems = (state: RootState) => state.dataItems;

export const { setItems } = dataSlice.actions;

export default dataSlice.reducer;
