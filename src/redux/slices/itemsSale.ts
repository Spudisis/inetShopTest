import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { Item, Status } from "./items";

export const fetchSaleMock = createAsyncThunk<Item[]>(
  `items/fetchItemsSale`,
  async () => {
    const { data } = await axios.get(
      `https://62f44a7fac59075124bbda32.mockapi.io/clicker?`
    );
    return data;
  }
);

export interface ItemsTypeSale {
  saleItems: Item[];
  loading: Status;
}
const initialState: ItemsTypeSale = {
  saleItems: [],
  loading: Status.LOADING,
};
export const dataSlice = createSlice({
  name: "dataSale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSaleMock.fulfilled, (state: ItemsTypeSale, action) => {
      const saleFilter = action.payload.filter((obj) => obj.sale !== 0);
      state.saleItems = saleFilter;
      state.loading = Status.SUCCESS;
    });
    builder.addCase(fetchSaleMock.pending, (state: ItemsTypeSale) => {
      state.saleItems = [];
      state.loading = Status.LOADING;
    });
    builder.addCase(fetchSaleMock.rejected, (state: ItemsTypeSale) => {
      state.saleItems = [];
      state.loading = Status.ERROR;
    });
  },
});

export const getSaleItemsSl = (state: RootState) => state.saleItems;

export const {} = dataSlice.actions;

export default dataSlice.reducer;
