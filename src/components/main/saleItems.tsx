import React from "react";
import { useSelector } from "react-redux";
import { getSaleItemsSl, ItemsTypeSale } from "../../redux/slices/itemsSaleSlice";
import { useAppDispatch } from "../../redux/store";
import BlockNameMain from "./BlockNameMain";
import ListItem from "../listItem";
import s from "../../sass/main.module.scss";
import { getPage, pages } from "../../redux/slices/pageSlice";
import ButtonSaleNavigate from "../buttons/buttonNavigateSale";
import { Status } from "../../redux/slices/itemsSlice";
import Skeleton from "../skeleton";
const SaleItems = () => {
  const { saleItems, loading }: ItemsTypeSale = useSelector(getSaleItemsSl);

  const { salePageCounter }: pages = useSelector(getPage);
  return (
    <div className={s.block}>
      <div className={s.saleBlockName}>
        <BlockNameMain name="Скидки" />
        <div className={s.buttonSaleNavigateShow}>
          <ButtonSaleNavigate />
        </div>
      </div>
      <div className={s.listSale}>
        {loading === Status.SUCCESS ? (
          saleItems
            .slice(salePageCounter, salePageCounter + 4)
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
                key={obj.id + "listSale"}
              />
            ))
        ) : loading === Status.LOADING ? (
          [...new Array(4)].map((_, index) => <Skeleton key={index} />)
        ) : (
          <div>warn</div>
        )}
      </div>
      <div className={s.buttonSaleNavigateHidden}>
        <ButtonSaleNavigate />
      </div>
    </div>
  );
};

export default SaleItems;
