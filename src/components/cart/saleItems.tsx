import React from "react";
import { useSelector } from "react-redux";
import { getSaleItemsSl, ItemsTypeSale } from "../../redux/slices/itemsSale";
import { useAppDispatch } from "../../redux/store";
import BlockNameMain from "../main/BlockNameMain";
import ListItem from "../listItem";
import s from "../../sass/main.module.scss";
const SaleItems = () => {
  const dispatch = useAppDispatch();
  const { saleItems, loading }: ItemsTypeSale = useSelector(getSaleItemsSl);
  const [page, setPage] = React.useState(0);
  return (
    <div className={s.block}>
      <div className={s.saleBlockName}>
        <BlockNameMain name="Скидки" />
        <div className={s.navigateSaleProduct}>
          <button
            onClick={() => setPage(page - 4)}
            disabled={page === 0 ? true : false}
          >
            &#60;
          </button>
          <button
            onClick={() => setPage(page + 4)}
            disabled={page + 4 >= saleItems.length - 1 ? true : false}
          >
            &#62;
          </button>
        </div>
      </div>
      <div className={s.listSale}>
        {saleItems.slice(page, page + 4).map((obj) => (
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
        ))}
      </div>
    </div>
  );
};

export default SaleItems;
