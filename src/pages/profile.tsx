import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import LikePage from "./LikePage";
import Person from "./Person";
import s from "../sass/profile.module.scss";
import { NavLink } from "react-router-dom";
import { getPage, setPageSls } from "../redux/slices/profilePages";



const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { page } = useSelector(getPage);

  const changePage = (swapPage: string) => {
    page !== swapPage && dispatch(setPageSls(swapPage));
  };

  return (
    <div className={s.container}>
      <h2 className={s.namePage}>Личный кабинет</h2>
      <div className={s.navigation}>
        <NavLink
          to="/profile"
          className={page === "person" ? s.spanNavigActive : s.spanNavig}
          onClick={() => changePage("person")}
        >
          Личные данные
        </NavLink>
        <NavLink
          to="/profile"
          className={page === "historyOrder" ? s.spanNavigActive : s.spanNavig}
          onClick={() => changePage("historyOrder")}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/profile"
          className={page === "like" ? s.spanNavigActive : s.spanNavig}
          onClick={() => changePage("like")}
        >
          Избранное
        </NavLink>
      </div>
      <div>
        {page === "like" ? <LikePage /> : page === "person" ? <Person /> : "no"}
      </div>
    </div>
  );
};

export default Profile;
