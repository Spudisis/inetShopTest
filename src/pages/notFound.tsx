import React from "react";
import s from "../sass/notFound.module.scss";
import Donut from "../assets/donut.svg";
import ButtonCatalog from "../components/buttons/buttonCatalog";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className={s.wrapper}>
      <div style={{ color: "#BEBEBE", fontWeight: 700, fontSize: 72 + "px" }}>Ошибка</div>
      <div className={s.error404}>
        <span>4</span>
        <img src={Donut} alt="donut" />
        <span>4</span>
      </div>
      <div className={s.text}>
        Ой! Кажется что-то пошло не так. Страница, которую вы запрашиваете, не существует. Возможно она устарела, была
        удалена, или был введен неверный адрес в адресной строке.
      </div>
      <div className={s.buttons}>
        <Link to="/" className={s.mainPageLink}>
          Перейти на главную
        </Link>
        <ButtonCatalog />
      </div>
    </div>
  );
};

export default NotFound;
