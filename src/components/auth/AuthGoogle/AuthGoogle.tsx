import React from "react";

import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../../../Firebase";
import s from "./AuthGoogle.module.scss";
import googleImg from "../../../assets/googleImg.svg.webp";
import { SetDB } from "../../../firestore/setDB";
import { useAuthState } from "react-firebase-hooks/auth";
import { getData } from "../../../pages/Person/Person";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { getAuthStatus } from "../../../redux/slices/profile";
import { isEmpty } from "lodash";
const AuthGoogle = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useSelector(getAuthStatus);

  const authUser = getAuth();
  const [user, loading, error] = useAuthState(authUser);
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  const signInWithPopup = () => {
    auth.signInWithPopup(provider);
  };

  React.useEffect(() => {
    if (user) {
      const func = async () => {
        const data = await getData(user, dispatch);
        data === 0 && SetDB(user);
      };
      func();
    }
  }, [user]);

  // React.useEffect(() => {
  //   if (!isEmpty(userInfo)) {
  //     console.log(userInfo);
  //   } else {
  //     console.log("aa");
  //   }
  // }, [userInfo]);

  return (
    <button className={s.authSocial} onClick={signInWithPopup}>
      Войти c Google <img src={googleImg} alt="" />
    </button>
  );
};

export default AuthGoogle;
