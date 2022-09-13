import React from "react";
import s from "./slider.module.scss";
import cashback from "../../../assets/categories/cashback.svg";
import saleBanner from "../../../assets/categories/saleBanner.svg";
import slider1 from "../../../assets/categories/slider1.svg";
const Slider = () => {
  return (
    <div className={s.Information}>
      <div className={s.Information__slider}>
        <img src={slider1} alt="slider1" />
      </div>
      <div className={s.Information__blocks}>
        <div className={s.Information__blocks__cashsale}>
          <img src={cashback} alt="cashback" />
        </div>
        <div className={s.Information__blocks__cashsale}>
          <img src={saleBanner} alt="saleBanner" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
