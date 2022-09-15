import React from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "./Form/Form";
import { useAppDispatch } from "../../redux/store";
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { SetDB } from "../../firestore/setDB";
import { getData } from "../../pages/Person/Person";
import { getAuthStatus } from "../../redux/slices/profile";
import { useSelector } from "react-redux";
import { setTempDB } from "../../firestore/setTempDB";
const SignUp = () => {
  const auth = getAuth();
  const { userInfo } = useSelector(getAuthStatus);
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const dispatch = useAppDispatch();

  const handleRegister = async (register: any) => {
    const { email, password } = register;
    await createUserWithEmailAndPassword(email, password);
  };

  React.useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (user) {
      const func = async () => {
        const { user: info } = user;
        const data = await getData(info, dispatch);
        data === 0 && SetDB(info);
        data === 0 && setTempDB(info);
      };
      func();
    }
  }, [user, loading]);

  return <Form title="Зарегистрироваться" handleClick={handleRegister} result={loading ? "" : error} />;
};

export default SignUp;
