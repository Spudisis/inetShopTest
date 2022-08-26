import React from "react";
import logoSite from "../assets/logoSite.svg";
import burger from "../assets/burger.png";
import s from "../sass/header.module.scss";
import Search from "./search";
import person from "../assets/person.png";
import like from "../assets/like.png";
import compass from "../assets/compass.png";
import shoppingCart from "../assets/shoppingCart.svg";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { setPageSls } from "../redux/slices/profilePages";

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.infoSite}>
          <Link to="">
            <img src={logoSite} alt="logo" className={s.logoSite} />
          </Link>
          <Link to="/catalog">
            <button className={s.catalogButton}>
              <img src={burger} alt="burger" /> Каталог
            </button>
          </Link>

          <Search />
          <div className={s.delivery}>
            <div className={s.delivery__left}>
              <img src={compass} alt="cursor" /> МСК
            </div>
            <div className={s.delivery__right}>
              <p>Выберите способ получения</p>
              <p>
                <b> Доставка или самовывоз</b>
              </p>
            </div>
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
          <div className={s.cart}>
            <img src={shoppingCart} alt="shoppingCart" />
            <b>Корзина</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
