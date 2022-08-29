import React from "react";
import { Link } from "react-router-dom";
import s from "../../sass/header.module.scss";
import burger from "../../assets/burger.png";
const ButtonCatalog = () => {
  return (
    <Link to="/catalog">
      <button className={s.catalogButton}>
        <img src={burger} alt="burger" /> Каталог
      </button>
    </Link>
  );
};

export default ButtonCatalog;
