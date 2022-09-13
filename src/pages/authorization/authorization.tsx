import React from "react";
import Auth from "../../components/auth/auth";
import SignUp from "../../components/auth/signUp";
import s from "./authorization.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPage } from "../../redux/slices/pageSlice";
const Authorization = () => {
  const [status, setStatus] = React.useState(false);
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const { beforePage } = useSelector(getPage);
  let navigate = useNavigate();
  React.useEffect(() => {
    console.log("authPage", user);
    if (user) {
      beforePage ? navigate(beforePage) : navigate("/profile");
    }
  }, [user]);
  return (
    <div className={s.wrapperAuthPage}>
      <h2 className={s.nameAuth}>{status ? "Регистрация" : "Вход"}</h2>
      <div className={s.wrapper}>{status ? <SignUp /> : <Auth />}</div>
      <button className={s.swapRegAuth} onClick={() => setStatus(!status)}>
        {status ? "Уже есть аккаунт?" : "Еще нет аккаунта?"}
      </button>
    </div>
  );
};

export default Authorization;
