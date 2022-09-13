import React from "react";
import { useSelector } from "react-redux";
import { getSaleItemsSl, ItemsTypeSale } from "../../../redux/slices/itemsSaleSlice";
import { downSalePage, getPage, pages, upSalePage } from "../../../redux/slices/pageSlice";
import { useAppDispatch } from "../../../redux/store";
import s from "./buttonNavigateSale.module.scss";
const ButtonSaleNavigate = () => {
  const dispatch = useAppDispatch();
  const { saleItems, loading }: ItemsTypeSale = useSelector(getSaleItemsSl);
  const { salePageCounter }: pages = useSelector(getPage);
  return (
    <div className={s.navigateSaleProduct}>
      <button onClick={() => dispatch(downSalePage())} disabled={salePageCounter === 0 ? true : false}>
        &#60;
      </button>
      <button
        onClick={() => dispatch(upSalePage())}
        disabled={salePageCounter + 4 >= saleItems.length - 1 ? true : false}
      >
        &#62;
      </button>
    </div>
  );
};

export default ButtonSaleNavigate;
