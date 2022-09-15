import React from "react";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import Form from "./Form/Form";
import { useAppDispatch } from "../../redux/store";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
const Auth = () => {
  const auth = getAuth();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const handleLogin = (register: any) => {
    const { email, password } = register;
    signInWithEmailAndPassword(email, password);
  };

  return <Form title={"Войти"} handleClick={handleLogin} result={loading ? "" : error} />;
};

export default Auth;
