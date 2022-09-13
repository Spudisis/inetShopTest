import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: any = {
  authStatus: false,
  beforePage: "",
  email: "",
  token: "",
  id: "",
};
export const profile = createSlice({
  name: "classChange",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.authStatus = action.payload;
    },
    setBeforePage: (state, action: PayloadAction<string>) => {
      state.beforePage = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.id = "";
    },
  },
});

export const getAuthStatus = (state: RootState) => state.pages;

export const { setAuthStatus, setBeforePage, setUser, removeUser } = profile.actions;

export default profile.reducer;
