import React from "react";
import { useSelector } from "react-redux";
import { getFilterData, statefilter } from "../../../redux/slices/filterSlice";
import { getDataItems, ItemsType, Status } from "../../../redux/slices/itemsSlice";
import { downCatalogPage, getPage, upCatalogPage } from "../../../redux/slices/pageSlice";
import { gerSortData, stateSort } from "../../../redux/slices/sortSlice";
import { useAppDispatch } from "../../../redux/store";
import ListItem from "../../listItems/listItem";
import Skeleton from "../../skeleton";
import s from "./showItems.module.scss";

type pages = {
  catalogPageCounter: number;
};
const ShowItems: React.FC<pages> = React.memo(({ catalogPageCounter }) => {
  const dispatch = useAppDispatch();
  const { itemsDop, loading }: ItemsType = useSelector(getDataItems);
  const { sale }: stateSort = useSelector(gerSortData);
  const nextPage = () => {
    const checkLenghtObj = sale ? itemRenderSale : itemsDop;
    if (checkLenghtObj.length > catalogPageCounter + 6) {
      dispatch(upCatalogPage());
    }
  };
  const prevPage = () => {
    if (catalogPageCounter > 0) {
      dispatch(downCatalogPage());
    }
  };
  const itemRenderSale = itemsDop
    .map(
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
    )
    .filter((obj) => obj !== false);

  const slicesItemsSale = itemRenderSale.slice(catalogPageCounter, catalogPageCounter + 6);

  const itemRenderNoneSale = itemsDop
    .slice(catalogPageCounter, catalogPageCounter + 6)
    .map((obj) => (
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
    <>
      <div className={s.root}>
        <div className={s.wrapperItems}>
          {loading === Status.LOADING ? (
            [...new Array(1)].map((_, index) => <Skeleton key={index} />)
          ) : loading === Status.ERROR ? (
            <div className={s.warn}>Произошла ошибка</div>
          ) : itemsDop.length === 0 ? (
            <div className={s.warn}>Попробуйте другие параметры для поиска</div>
          ) : sale ? (
            slicesItemsSale
          ) : (
            itemRenderNoneSale
          )}
        </div>
      </div>

      <div className={s.buttonItemNavigate}>
        <button onClick={() => prevPage()}>Назад</button>
        <button onClick={() => nextPage()}>Далее</button>
      </div>
    </>
  );
});

export default ShowItems;
