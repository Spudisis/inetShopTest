import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import LikePage from "../likePage/LikePage";
import Person from "../Person";
import s from "./profile.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { getPage, setPageSls } from "../../redux/slices/pageSlice";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { page } = useSelector(getPage);
  const auth = getAuth();
  let navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const changePage = (swapPage: string) => {
    page !== swapPage && dispatch(setPageSls(swapPage));
  };

  React.useEffect(() => {
    if (!user) {
      return navigate("/authorization");
    }
  }, []);

  return (
    <div className={s.container}>
      <h2 className={s.namePage}>Личный кабинет</h2>
      <div className={s.navigation}>
        <button className={page === "person" ? s.spanNavigActive : s.spanNavig} onClick={() => changePage("person")}>
          Личные данные
        </button>
        <button
          className={page === "historyOrder" ? s.spanNavigActive : s.spanNavig}
          onClick={() => changePage("historyOrder")}
        >
          История заказов
        </button>
        <button className={page === "like" ? s.spanNavigActive : s.spanNavig} onClick={() => changePage("like")}>
          Избранное
        </button>
      </div>
      <div>{page === "like" ? <LikePage /> : page === "person" ? <Person /> : "no"}</div>
    </div>
  );
};

export default Profile;
