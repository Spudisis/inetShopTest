import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type statefilter = {
  search: string;
  filterBy: string;
  ascDesc: string;
  type: string;
  filtersView: string[];
};

const initialState: statefilter = {
  search: "",
  filterBy: "name",
  ascDesc: "asc",
  type: "",
  filtersView: [],
};
export const dataSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    addSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    addFilter: (state, action: PayloadAction<string>) => {
      state.filterBy = action.payload;
    },
    addAscdesc: (state) => {
      state.ascDesc === "desc"
        ? (state.ascDesc = "asc")
        : (state.ascDesc = "desc");
    },
    addType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
      state.filtersView = [];
    },
    deleteType: (state) => {
      state.type = "";
      state.filtersView = [];
    },
    addFilterView: (state, action: PayloadAction<string>) => {
      state.filtersView.filter((obj) => obj !== action.payload);
      state.filtersView.push(action.payload);
    },
    clearFilterView: (state) => {
      state.filtersView = [];
      state.type = "";
      state.search = "";
      state.filterBy = "name";
      state.ascDesc = "asc";
    },
  },
});

export const getFilterData = (state: RootState) => state.filter;

export const {
  addSearch,
  addFilter,
  addAscdesc,
  addType,
  deleteType,
  addFilterView,
  clearFilterView,
} = dataSlice.actions;

export default dataSlice.reducer;
