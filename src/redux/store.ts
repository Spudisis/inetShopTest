import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import dataItems from "./slices/items";
import likes from "./slices/likeItems";
import profile from "./slices/profilePages";
import filter from "./slices/filterSlice";
import sort from "./slices/sortSlice";
export const store = configureStore({
  reducer: { dataItems, likes, profile, filter, sort },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
