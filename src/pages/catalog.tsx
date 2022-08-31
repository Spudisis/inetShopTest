import React from "react";
import { useSelector } from "react-redux";
import ListItem from "../components/listItem";
import Skeleton from "../components/skeleton";
import { useAppDispatch } from "../redux/store";
import s from "../sass/catalog.module.scss";
import Filters from "../components/catalog/filters";
import { fetchProductMock, getDataItems, Item, ItemsType, setItems, Status } from "../redux/slices/itemsSlice";
import { getFilterData, statefilter } from "../redux/slices/filterSlice";
import { gerSortData, stateSort } from "../redux/slices/sortSlice";
import SetFilters from "../components/catalog/setFilters";
import PopupSort from "../components/catalog/popupSort";
import ShowItems from "../components/catalog/showItems";
import { getPage } from "../redux/slices/pageSlice";
export type filter = {
  search: string;
  filterBy: string;
  ascDesc: string;
  type: string;
  sale: boolean;
};

const Catalog = () => {
  const dispatch = useAppDispatch();
  const { items, itemsDop, loading }: ItemsType = useSelector(getDataItems);
  const { search, filterBy, ascDesc, filtersView, type }: statefilter = useSelector(getFilterData);
  const { sale }: stateSort = useSelector(gerSortData);
  const { catalogPageCounter } = useSelector(getPage);
  const fetchData = () => {
    dispatch(fetchProductMock({ search, filterBy, ascDesc, type, sale }));
  };
  const changeNewMass = () => {
    let newIt: Item[] = items;
    if (filtersView.length !== 0) {
      newIt = [];
      items.forEach((elem) => {
        filtersView.forEach((obj) => {
          if (obj.class === elem.class) {
            newIt.push(elem);
          }
        });
      });
    }
    dispatch(setItems(newIt));
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  React.useEffect(() => {
    fetchData();
  }, [search, filterBy, ascDesc, type]);
  React.useEffect(() => {
    changeNewMass();
  }, [filtersView, items]);

  return (
    <div className={s.catalog}>
      <div className={s.filterAsk}>
        <div className={s.typeCatalog}> {type ? type : "Товары"}</div>
        <PopupSort />
      </div>
      <div className={s.filters}>
        <Filters />
        <div className={s.itemsFiltersSet}>
          <div className={s.SelectFilter}>
            <SetFilters />
          </div>
          <ShowItems catalogPageCounter={catalogPageCounter} />
        </div>
      </div>
    </div>
  );
};
export default Catalog;
