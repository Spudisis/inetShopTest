import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { filter } from "../../pages/catalog";
import { RootState } from "../store";

export const fetchProductMock = createAsyncThunk<ItemsType, filter>(
  `items/fetchItemsProduct`,
  async ({ search, filterBy, ascDesc, type }) => {
    try {
      const { data } = await axios.get(
        `https://62f44a7fac59075124bbda32.mockapi.io/clicker?${
          type ? "type=" + type : ""
        }&${filterBy !== "" ? "sortBy=" + filterBy : ""}&order=${ascDesc}`
      );
      return data;
    } catch (error) {
      alert("ошибка");
    }
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

export interface ItemsType {
  items: Item[];
}
const initialState: ItemsType = {
  items: [],
};
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductMock.fulfilled, (state: any, action) => {
      state.items = action.payload;
    });
  },
});

export const getDataItems = (state: RootState) => state.dataItems.items;

export const {} = dataSlice.actions;

export default dataSlice.reducer;
