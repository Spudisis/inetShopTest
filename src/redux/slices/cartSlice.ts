import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { propsItem } from "../../components/listItems/listItem";
import { RootState } from "../store";
import { Item } from "./itemsSlice";

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
    setItemFromDB: (state, action: PayloadAction<any>) => {
      state.items = action.payload.items.cartItem;
      state.totalPrice = state.items.reduce((sum, obj) => {
        return Math.ceil((obj.price / 100) * (100 - obj.saleProd)) * obj.countCart + sum;
      }, 0);
    },

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
        return Math.ceil((obj.price / 100) * (100 - obj.saleProd)) * obj.countCart + sum;
      }, 0);
    },
    delItemCart: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        if (findItem.countCart > 1) {
          findItem.countCart--;
        } else {
          state.items = state.items.filter((obj) => obj.id !== action.payload);
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return Math.ceil((obj.price / 100) * (100 - obj.saleProd)) * obj.countCart + sum;
        }, 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const getCartItems = (state: RootState) => state.cart.items;
export const getTotalPriceItems = (state: RootState) => state.cart.totalPrice;

export const { setItemFromDB, setItemsCart, delItemCart, clearCart } = dataSlice.actions;

export default dataSlice.reducer;
