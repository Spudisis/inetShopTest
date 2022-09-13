import React from "react";
import { useSelector } from "react-redux";
import {
  clearFilterView,
  deleteFilterView,
  deleteType,
  getFilterData,
  statefilter,
} from "../../../redux/slices/filterSlice";
import { changeParamSale } from "../../../redux/slices/sortSlice";
import { useAppDispatch } from "../../../redux/store";
import s from "./setFilters.module.scss";

const SetFilters = React.memo(() => {
  const dispatch = useAppDispatch();
  const { type, filtersView }: statefilter = useSelector(getFilterData);
  const [nullFilters, setNullFilters] = React.useState(false);
  const deleteTypeView = () => {
    dispatch(deleteType());
  };

  const clearFilters = () => {
    dispatch(clearFilterView());
    dispatch(changeParamSale(false));
  };

  React.useEffect(() => {
    type || filtersView.length !== 0 ? setNullFilters(true) : setNullFilters(false);
  }, [type, filtersView]);
  return (
    <div className={s.container}>
      {type && (
        <button className={s.block} onClick={() => deleteTypeView()}>
          {type} &#10006;
        </button>
      )}
      {filtersView &&
        filtersView.map((obj, index) => (
          <button key={"view" + index} className={s.block} onClick={() => dispatch(deleteFilterView(obj))}>
            {obj.classForPerson} &#10006;
          </button>
        ))}
      {nullFilters ? (
        <button className={s.block} onClick={() => clearFilters()}>
          Очистить фильтр
        </button>
      ) : (
        <div className={s.textHelp}>Добавьте фильтры для поиска</div>
      )}
    </div>
  );
});

export default SetFilters;
