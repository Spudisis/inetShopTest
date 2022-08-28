import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { propsItem } from "../../components/listItem";
import { RootState } from "../store";
import { Item } from "./items";

export type ItemCart = {
  nameProd: string;
  id: string;
  price: number;
  title: string;
  count: number;
  weight: number;
  imageUrl: string;
  classProduct: string;
  saleProd: number;
  countCart: number;
};
export interface ItemsType {
  items: ItemCart[];
  totalPrice: number;
}
const initialState: ItemsType = {
  items: [],
  totalPrice: 0,
};
export const dataSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItemsCart: (state, action: PayloadAction<propsItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.countCart++;
      } else {
        state.items.push({
          ...action.payload,
          countCart: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (
          Math.ceil((obj.price / 100) * (100 - obj.saleProd)) * obj.countCart +
          sum
        );
      }, 0);
    },
    delItemCart: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.countCart--;
        state.totalPrice = state.items.reduce((sum, obj) => {
          return (
            Math.ceil((obj.price / 100) * (100 - obj.saleProd)) *
              obj.countCart +
            sum
          );
        }, 0);
      }
    },
  },
});

export const getCartItems = (state: RootState) => state.cart.items;

export const { setItemsCart, delItemCart } = dataSlice.actions;

export default dataSlice.reducer;
