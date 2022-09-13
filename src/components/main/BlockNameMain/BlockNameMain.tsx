import React from "react";
import s from "./BlockNameMain.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { changeParamSale } from "../../../redux/slices/sortSlice";
import { addFilterView, addType } from "../../../redux/slices/filterSlice";
import { useSelector } from "react-redux";
import ItemForFilters from "../../../assets/Json/ItemForFilters.json";
type propBlockName = {
  name: string;
};
const BlockNameMain = ({ name }: propBlockName) => {
  const dispatch = useAppDispatch();
  const catalogParam = () => {
    if (name === "Скидки") {
      dispatch(changeParamSale(true));
    } else {
      SendFilterType(name);
    }
  };
  const SendFilterType = (type: string) => {
    dispatch(addType(type));
    ItemForFilters.map((elem) => {
      elem.type === type && dispatch(() => ChangeClassProduct(elem.class, elem.classForPerson));
    });
  };
  const ChangeClassProduct = (classT: string, classForPerson: string) => {
    const classAdd = { class: classT, classForPerson: classForPerson };
    dispatch(addFilterView(classAdd));
  };
  return (
    <div className={s.hBlockName}>
      <h2>{name}</h2>
      <Link to="/catalog" onClick={() => catalogParam()}>
        <button>Смотреть все &#62;</button>
      </Link>
    </div>
  );
};

export default BlockNameMain;
