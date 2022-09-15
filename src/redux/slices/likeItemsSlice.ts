import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { propsItem } from "../../components/listItems/listItem";
import { RootState } from "../store";

type likeItems = {
  likeItems: propsItem[];
};

const initialState: likeItems = {
  likeItems: [],
};
export const styleSlice = createSlice({
  name: "classChange",
  initialState,
  reducers: {
    addLikeProductDB: (state, action) => {
      state.likeItems = action.payload.likeItems.itemsLike;
    },
    addLikeProduct: (state, action) => {
      state.likeItems.push(action.payload);
    },
    deleteLikeProduct: (state, action: PayloadAction<string>) => {
      if (state.likeItems.length !== 0) {
        state.likeItems = state.likeItems.filter((obj) => obj.id !== action.payload);
      }
    },
    clearLikeProduct: (state) => {
      state.likeItems = [];
    },
  },
});

export const getItemsLike = (state: RootState) => state.likes.likeItems;
export const { addLikeProductDB, addLikeProduct, deleteLikeProduct, clearLikeProduct } = styleSlice.actions;

export default styleSlice.reducer;
