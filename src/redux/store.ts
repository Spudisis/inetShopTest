import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import dataItems from "./slices/itemsSlice";
import likes from "./slices/likeItemsSlice";
import profile from "./slices/pageSlice";
import filter from "./slices/filterSlice";
import sort from "./slices/sortSlice";
import saleItems from "./slices/itemsSaleSlice";
import cart from "./slices/cartSlice";
export const store = configureStore({
  reducer: { dataItems, likes, profile, filter, sort, saleItems, cart },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
