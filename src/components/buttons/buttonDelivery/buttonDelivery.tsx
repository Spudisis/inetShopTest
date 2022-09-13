import React from "react";
import compass from "../../../assets/compass.png";
import s from "./buttonDelivery.module.scss";
const ButtonDelivery = () => {
  return (
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
  );
};

export default ButtonDelivery;
