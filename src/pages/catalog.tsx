import React from "react";
import { useSelector } from "react-redux";
import ListItem from "../components/listItem";
import Skeleton from "../components/skeleton";
import { useAppDispatch } from "../redux/store";
import s from "../sass/catalog.module.scss";
import Filters from "../components/catalog/filters";
import {
  fetchProductMock,
  getDataItems,
  Item,
  ItemsType,
  setItems,
  Status,
} from "../redux/slices/items";
import { getFilterData, statefilter } from "../redux/slices/filterSlice";
import { gerSortData, stateSort } from "../redux/slices/sortSlice";
import SetFilters from "../components/catalog/setFilters";
import PopupSort from "../components/catalog/popupSort";

export type filter = {
  search: string;
  filterBy: string;
  ascDesc: string;
  type: string;
  sale: boolean;
};

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, itemsDop, loading }: ItemsType = useSelector(getDataItems);
  const { search, filterBy, ascDesc, filtersView, type }: statefilter =
    useSelector(getFilterData);
  const { sale }: stateSort = useSelector(gerSortData);
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

  const itemRenderSale = itemsDop.map(
    (obj) =>
      obj.sale !== 0 && (
        <ListItem
          id={obj.id}
          price={obj.price}
          title={obj.title}
          count={obj.count}
          weight={obj.weight}
          imageUrl={obj.imageUrl}
          classProduct={obj.class}
          nameProd={obj.name}
          saleProd={obj.sale}
          key={obj.id + "list"}
        />
      )
  );

  const itemRenderNoneSale = itemsDop.map((obj) => (
    <ListItem
      id={obj.id}
      price={obj.price}
      title={obj.title}
      count={obj.count}
      weight={obj.weight}
      imageUrl={obj.imageUrl}
      classProduct={obj.class}
      nameProd={obj.name}
      saleProd={obj.sale}
      key={obj.id + "list"}
    />
  ));

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
          <div className={s.wrapperItems}>
            {loading === Status.LOADING ? (
              [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            ) : loading === Status.ERROR ? (
              <div className={s.warn}>Произошла ошибка</div>
            ) : itemsDop.length === 0 ? (
              <div className={s.warn}>
                Попробуйте другие параметры для поиска
              </div>
            ) : sale ? (
              itemRenderSale
            ) : (
              itemRenderNoneSale
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Catalog;
