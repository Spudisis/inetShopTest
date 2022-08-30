import React from "react";
import logoSite from "../../assets/logoSite.svg";
import s from "../../sass/header.module.scss";
import Search from "../search";
import person from "../../assets/person.png";
import like from "../../assets/like.png";

import shoppingCart from "../../assets/shoppingCart.svg";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { setPageSls } from "../../redux/slices/pageSlice";
import { useSelector } from "react-redux";
import { getTotalPriceItems } from "../../redux/slices/cartSlice";
import ButtonCatalog from "../buttons/buttonCatalog";
import ButtonDelivery from "../buttons/buttonDelivery";
const Header = () => {
  const dispatch = useAppDispatch();
  const totalPrice = useSelector(getTotalPriceItems);
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Link to="">
          <img src={logoSite} alt="logo" className={s.logoSite} />
        </Link>
        <div className={s.hide1250}>
          <ButtonCatalog />
          <Search />
          <ButtonDelivery />
        </div>
        <div className={s.buttons}>
          <Link to="/profile" onClick={() => dispatch(setPageSls("person"))}>
            <button className={s.buttons__button}>
              <img src={person} alt="person" />
            </button>
          </Link>
          <Link to="/profile" onClick={() => dispatch(setPageSls("like"))}>
            <button className={s.buttons__button}>
              <img src={like} alt="like" />
            </button>
          </Link>
        </div>
        <div className={s.redButton}>
          <div className={s.showCatalog}>
            <ButtonCatalog />
          </div>
          <Link to="/cart">
            <div className={s.cart}>
              <img src={shoppingCart} alt="shoppingCart" />
              {totalPrice ? <b>{totalPrice} Руб.</b> : <b>Корзина</b>}
            </div>
          </Link>
        </div>
      </div>
      <div className={s.deliverySearch}>
        <ButtonDelivery />
        <Search />
      </div>
    </div>
  );
};

export default Header;
