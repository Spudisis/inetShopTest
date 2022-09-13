import React from "react";
import s from "./navigation.module.scss";
import apple from "../../assets/categories/apple.svg";
import pizza from "../../assets/categories/pizza.svg";
import chebureck from "../../assets/categories/chebureck.svg";
import sale from "../../assets/categories/sale.svg";
import shops from "../../assets/categories/shops.svg";
import some from "../../assets/categories/some.svg";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { addFilterView, addType } from "../../redux/slices/filterSlice";
import ItemForFilters from "../../assets/Json/ItemForFilters.json";
import { changeParamSale, gerSortData } from "../../redux/slices/sortSlice";
import { clearCatalogPage } from "../../redux/slices/pageSlice";

const types = ["Супермаркет", "Кулинария", "Заморозка", "Другое"];
const typesImg = [apple, pizza, chebureck, some, sale, shops];
const Navigation = () => {
  const dispatch = useAppDispatch();

  const SendFilterType = (type: string) => {
    dispatch(addType(type));
    ItemForFilters.map((elem) => {
      elem.type === type && dispatch(() => ChangeClassProduct(elem.class, elem.classForPerson));
    });
    dispatch(clearCatalogPage());
    dispatch(changeParamSale(false));
  };
  const ChangeClassProduct = (classT: string, classForPerson: string) => {
    const classAdd = { class: classT, classForPerson: classForPerson };
    dispatch(addFilterView(classAdd));
    dispatch(clearCatalogPage());
  };

  return (
    <div className={s.container}>
      <div className={s.navigate}>
        {types.map((elem, index) => (
          <Link to="/catalog" onClick={() => SendFilterType(elem)} key={index + "navigation"}>
            <div className={s.navigate__button}>
              <img src={typesImg[index]} alt={typesImg[index]} />
              {elem}
            </div>
          </Link>
        ))}
        <Link to="/catalog" onClick={() => dispatch(changeParamSale(true))}>
          <div className={s.navigate__button}>
            <img src={sale} alt="sale" /> Акции
          </div>
        </Link>
        <Link to="/catalog">
          <div className={s.navigate__button}>
            <img src={shops} alt="shops" /> Магазины
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
