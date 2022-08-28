import React from "react";
import { useSelector } from "react-redux";
import ListItem from "../components/listItem";
import Skeleton from "../components/skeleton";
import { useAppDispatch } from "../redux/store";
import s from "../sass/catalog.module.scss";
import Filters from "../components/filters";
import {
  fetchProductMock,
  getDataItems,
  Item,
  ItemsType,
  setItems,
  Status,
} from "../redux/slices/items";
import {
  addAscdesc,
  addFilter,
  getFilterData,
  statefilter,
} from "../redux/slices/filterSlice";
import { gerSortData, stateSort } from "../redux/slices/sortSlice";
import SetFilters from "../components/setFilters";

export type filter = {
  search: string;
  filterBy: string;
  ascDesc: string;
  type: string;
  sale: boolean;
};

const sortingParams = [
  {
    name: "По цене",
    originalName: "price",
  },
  {
    name: "По алфавиту",
    originalName: "name",
  },
  {
    name: "По количеству",
    originalName: "count",
  },
];

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items, itemsDop, loading }: ItemsType = useSelector(getDataItems);
  const [visible, isVisible] = React.useState(false);
  const [sortingParam, setSortingParam] = React.useState("По цене");
  const [rotateArrow, setRotateArrow] = React.useState(s.ascDesc);
  const { search, filterBy, ascDesc, filtersView, type }: statefilter =
    useSelector(getFilterData);
  const { sale }: stateSort = useSelector(gerSortData);
  const fetchData = () => {
    dispatch(fetchProductMock({ search, filterBy, ascDesc, type, sale }));
  };

  const setAscDesc = () => {
    rotateArrow === s.ascDesc
      ? setRotateArrow(s.ascDescRotate)
      : setRotateArrow(s.ascDesc);
    dispatch(addAscdesc());
  };
  const changeSortParam = (name: string) => {
    setSortingParam(name);
    isVisible(false);
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
    sortingParams.map((obj) => {
      obj.name === sortingParam && dispatch(addFilter(obj.originalName));
    });
  }, [sortingParam]);

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

  const itemRenderOutSale = itemsDop.map((obj) => (
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
        <div>
          <div className={s.setFilter}>
            <b onClick={() => isVisible(!visible)}>{sortingParam}&nbsp;</b>
            <div className={rotateArrow} onClick={() => setAscDesc()}>
              &gt;
            </div>
          </div>
          {visible && (
            <div className={s.popup}>
              {sortingParams.map((obj, index) => (
                <div
                  key={"sorting" + index}
                  className={s.setFilterPopup}
                  onClick={() => changeSortParam(obj.name)}
                >
                  <b>{obj.name}</b>
                </div>
              ))}
            </div>
          )}
        </div>
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
              itemRenderOutSale
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Catalog;
