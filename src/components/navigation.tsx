import React from "react";
import s from "../sass/navigation.module.scss";
import apple from "../assets/categories/apple.svg";
import pizza from "../assets/categories/pizza.svg";
import chebureck from "../assets/categories/chebureck.svg";
import sale from "../assets/categories/sale.svg";
import shops from "../assets/categories/shops.svg";
import some from "../assets/categories/some.svg";

const Navigation = () => {
  return (
    <div className={s.container}>
      <div className={s.navigate}>
        <div className={s.navigate__button}>
          <img src={apple} alt="apple" /> Супермаркет
        </div>
        <div className={s.navigate__button}>
          <img src={pizza} alt="pizza" /> Кулинария
        </div>
        <div className={s.navigate__button}>
          <img src={chebureck} alt="chebureck" /> Заморозка
        </div>
        <div className={s.navigate__button}>
          <img src={some} alt="some" /> Другое
        </div>
        <div className={s.navigate__button}>
          <img src={sale} alt="sale" /> Акции
        </div>
        <div className={s.navigate__button}>
          <img src={shops} alt="shops" /> Магазины
        </div>
      </div>
    </div>
  );
};

export default Navigation;
