import React from "react";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import Form from "./Form/Form";
import { useAppDispatch } from "../../redux/store";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
const Auth = () => {
  const auth = getAuth();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const dispatch = useAppDispatch();

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(email, password);
  };

  React.useEffect(() => {
    if (loading) {
      console.log("load");
    }
    if (user) {
      const { user: info } = user;
      console.log(info);
    }
  }, [user, loading]);

  return <Form title={"Войти"} handleClick={handleLogin} />;
};

export default Auth;
