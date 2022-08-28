import React from "react";
import s from "../sass/main.module.scss";
import Slider from "../components/slider";
import list from "../sass/listItem.module.scss";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import {
  fetchSaleMock,
  getSaleItemsSl,
  ItemsTypeSale,
} from "../redux/slices/itemsSale";
import ListItem from "../components/listItem";
import BlockNameMain from "../components/BlockNameMain";
import BlocksInfoMain from "../components/BlocksInfoMain";
const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { saleItems, loading }: ItemsTypeSale = useSelector(getSaleItemsSl);
  const [page, setPage] = React.useState(0);
  React.useEffect(() => {
    saleItems.length === 0 && dispatch(fetchSaleMock());
  }, []);
  return (
    <div>
      <Slider />
      <div className={s.blocksTypesProduct}>
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
        <div className={s.block}>
          <BlockNameMain name="Супермаркет" />
          <div className={s.wrapperInfoBlocks}>
            <BlocksInfoMain classProduct="Супермаркет" />
          </div>
        </div>
        <div className={s.block}>
          <BlockNameMain name="Кулинария" />
          <div className={s.wrapperInfoBlocks}>
            <BlocksInfoMain classProduct="Кулинария" />
          </div>
        </div>
        <div className={s.block}>
          <BlockNameMain name="Заморозка" />
          <div className={s.wrapperInfoBlocks}>
            <BlocksInfoMain classProduct="Заморозка" />
          </div>
        </div>

        <div className={s.block}>
          <BlockNameMain name="Другое" />
          <div className={s.wrapperInfoBlocks}>
            <BlocksInfoMain classProduct="Другое" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
