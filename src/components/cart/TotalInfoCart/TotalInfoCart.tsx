import React from "react";
import { useSelector } from "react-redux";
import { getCartItems, getTotalPriceItems } from "../../../redux/slices/cartSlice";
import { useAppDispatch } from "../../../redux/store";
import s from "./totalIfoCart.module.scss";

const TotalInfoCart = () => {
  const [weight, setWeight] = React.useState(0);
  const [weightWater, setWeightWater] = React.useState(0);
  const totalPrice = useSelector(getTotalPriceItems);
  const items = useSelector(getCartItems);
  const countItemsTotal = items.reduce((sum, obj) => sum + obj.countCart, 0);
  const calcWeight = () => {
    const countweightWaterTotal = items.reduce(
      (sum, obj) =>
        obj.classProduct === "water" || obj.classProduct === "milk" ? sum + obj.weight * obj.countCart : sum + 0,
      0
    );
    const countweightTotal = items.reduce(
      (sum, obj) =>
        obj.classProduct !== "water" && obj.classProduct !== "milk" ? sum + obj.weight * obj.countCart : sum + 0,
      0
    );
    setWeightWater(countweightWaterTotal);
    setWeight(countweightTotal);
  };

  React.useEffect(() => {
    calcWeight();
  }, [items]);
  return (
    <div className={s.wrapper}>
      <div>
        <div className={s.infoOrder}>
          <p>Товары ({countItemsTotal})</p>
          <p>
            {weightWater}&nbsp;Л. , {(weight / 1000).toFixed(2)}&nbsp;кг.
          </p>
        </div>
        <div className={s.infoOrder}>
          <p></p>
          <p></p>
        </div>
        <div className={s.infoOrder}>
          <p>К оплате</p>
          <p>{totalPrice} Руб.</p>
        </div>
      </div>
      <button className={s.confirmOrder}>Оформить заказ</button>
    </div>
  );
};

export default TotalInfoCart;
