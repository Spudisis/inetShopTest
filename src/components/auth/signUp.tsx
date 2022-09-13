import React from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "./Form";
import { useAppDispatch } from "../../redux/store";
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { SetDB } from "./setDB";
const SignUp = () => {
  const auth = getAuth();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const dispatch = useAppDispatch();

  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(email, password);
  };

  React.useEffect(() => {
    if (loading) {
      console.log("load");
    }
    if (user) {
      const { user: info } = user;
      console.log(info);
      SetDB(info);
    }
  }, [user, loading]);

  return <Form title="Зарегистрироваться" handleClick={handleRegister} />;
};

export default SignUp;
