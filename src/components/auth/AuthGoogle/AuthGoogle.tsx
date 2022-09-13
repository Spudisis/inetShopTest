import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../../../Firebase";
import s from "./AuthGoogle.module.scss";
import googleImg from "../../../assets/googleImg.svg.webp";
const AuthGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  const signInWithPopup = () => auth.signInWithPopup(provider);
  const signInWithRedirect = () => auth.signInWithRedirect(provider);

  return (
    <button className={s.authSocial} onClick={signInWithPopup}>
      Войти c Google <img src={googleImg} alt="" />
    </button>
  );
};

export default AuthGoogle;
