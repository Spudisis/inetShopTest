import React from "react";
import s from "../sass/main.module.scss";
import Slider from "../components/slider";

const Main: React.FC = () => {
  return (
    <div>
      <Slider />
      <div className={s.wrapperItems}></div>
    </div>
  );
};

export default Main;
