import React from "react";
import logoSite from "../../../assets/logoSite.svg";
import s from "./header.module.scss";
import Search from "../../search/search";
import person from "../../../assets/person.png";
import like from "../../../assets/like.png";
import shoppingCart from "../../../assets/shoppingCart.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { getPage, setBeforePage, setPageSls } from "../../../redux/slices/pageSlice";
import { useSelector } from "react-redux";
import { getTotalPriceItems } from "../../../redux/slices/cartSlice";
import ButtonCatalog from "../../buttons/buttonCatalog/buttonCatalog";
import ButtonDelivery from "../../buttons/buttonDelivery/buttonDelivery";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const dispatch = useAppDispatch();
  const totalPrice = useSelector(getTotalPriceItems);

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const setProfilePage = (page: string) => {
    !user && dispatch(setBeforePage("/profile"));
    dispatch(setPageSls(page));
  };

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
          <Link to={!user ? "/authorization" : "/profile"} onClick={() => setProfilePage("person")}>
            <button className={s.buttons__button}>
              <img src={person} alt="person" />
            </button>
          </Link>
          <Link to={!user ? "/authorization" : "/profile"} onClick={() => setProfilePage("like")}>
            <button className={s.buttons__button}>
              <img src={like} alt="like" />
            </button>
          </Link>
        </div>
        <div className={s.redButton}>
          <div className={s.showCatalog}>
            <ButtonCatalog />
          </div>
          <Link to={!user ? "/authorization" : "/cart"}>
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
