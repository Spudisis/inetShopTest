import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type statefilter = {
  search: string;
  filterBy: string;
  ascDesc: string;
  type: string;
  filtersView: filterViewT[];
};

type filterViewT = {
  class: string;
  classForPerson: string;
};

const initialState: statefilter = {
  search: "",
  filterBy: "price",
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
    addFilterView: (state, action: PayloadAction<filterViewT>) => {
      const check = state.filtersView.filter(
        (obj) =>
          obj.class !== action.payload.class &&
          obj.classForPerson !== action.payload.classForPerson
      );
      check.length < state.filtersView.length
        ? (state.filtersView = check)
        : state.filtersView.push(action.payload);
    },
    deleteFilterView: (state, action: PayloadAction<filterViewT>) => {
      const newMas = state.filtersView.filter(
        (obj) =>
          obj.class !== action.payload.class &&
          obj.classForPerson !== action.payload.classForPerson
      );
      state.filtersView = newMas;
    },
    deleteAllFilterView: (state) => {
      state.filtersView = [];
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
  deleteFilterView,
  deleteAllFilterView,
  clearFilterView,
} = dataSlice.actions;

export default dataSlice.reducer;
