import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: any = {
  authStatus: false,
  beforePage: "",
  userInfo: {},
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
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = {};
    },
  },
});

export const getAuthStatus = (state: RootState) => state.profile;

export const { setAuthStatus, setBeforePage, setUser, removeUser } = profile.actions;

export default profile.reducer;
