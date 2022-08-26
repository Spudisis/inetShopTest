import React from "react";
import { useSelector } from "react-redux";
import {
  deleteType,
  getFilterData,
  statefilter,
} from "../redux/slices/filterSlice";
import { useAppDispatch } from "../redux/store";

const SetFilters = () => {
  const dispatch = useAppDispatch();
  const { type, filtersView }: statefilter =
    useSelector(getFilterData);

  React.useEffect(() => {
    console.log("change");
  }, [type, filtersView]);
  const deleteTypeView = () => {
    console.log(type);
    dispatch(deleteType());
  };
  return (
    <div>
      {type && (
        <div>
          <span>{type}</span>
          <button onClick={() => deleteTypeView()}>Удалить</button>
        </div>
      )}
      <div>

      </div>
    </div>
  );
};

export default SetFilters;
