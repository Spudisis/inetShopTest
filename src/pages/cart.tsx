import React from "react";
import { useSelector } from "react-redux";
import { getCartItems } from "../redux/slices/cartSlice";
import s from "../sass/cart.module.scss";
const Cart = () => {
  const items = useSelector(getCartItems);
  return (
    <div className={s.wrapper}>
      <h2 className={s.wrapper__cart}>Корзина</h2>
      <div>
        {items &&
          items.map((obj, index) => <div key={index}>{obj.nameProd}</div>)}
      </div>
    </div>
  );
};

export default Cart;
