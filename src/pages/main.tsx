import React from "react";
import s from "../sass/main.module.scss";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { fetchSaleMock, getSaleItemsSl, ItemsTypeSale } from "../redux/slices/itemsSaleSlice";
import BlockNameMain from "../components/main/BlockNameMain";
import BlocksInfoMain from "../components/main/BlocksInfoMain";
import SaleItems from "../components/main/saleItems";
import Loader from "../components/main/sliderSkeleton";
import Slider from "../components/main/slider";

const Main = () => {
  const dispatch = useAppDispatch();
  const { saleItems, loading }: ItemsTypeSale = useSelector(getSaleItemsSl);

  const SliderElem = React.lazy(() => import("../components/main/slider"));
  React.useEffect(() => {
    saleItems.length === 0 && dispatch(fetchSaleMock());
  }, []);
  return (
    <div>
      <React.Suspense fallback={<Loader />}>
        <SliderElem />
      </React.Suspense>
      {/* <Slider /> */}
      <div className={s.blocksTypesProduct}>
        <SaleItems />
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
