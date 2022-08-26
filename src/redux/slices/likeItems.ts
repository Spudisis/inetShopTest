import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { propsItem } from "../../components/listItem";
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
    addLikeProduct: (state, action) => {
      state.likeItems.push(action.payload);
    },
    deleteLikeProduct: (state, action: PayloadAction<string>) => {
      if (state.likeItems.length !== 0) {
        state.likeItems = state.likeItems.filter(
          (obj) => obj.id !== action.payload
        );
      }
    },
  },
});

export const getItemsLike = (state: RootState) => state.likes.likeItems;
export const { addLikeProduct, deleteLikeProduct } = styleSlice.actions;

export default styleSlice.reducer;
