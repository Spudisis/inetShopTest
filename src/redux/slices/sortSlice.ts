import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type stateSort = {
  sale: boolean;
};

const initialState: stateSort = {
  sale: false,
};
export const dataSlice = createSlice({
  name: "sortSlice",
  initialState,
  reducers: {
    changeParamSale: (state, action: PayloadAction<boolean>) => {
      state.sale = action.payload;
    },
  },
});

export const gerSortData = (state: RootState) => state.sort;

export const { changeParamSale } = dataSlice.actions;

export default dataSlice.reducer;
