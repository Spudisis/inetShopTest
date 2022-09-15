import React from "react";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import firebase from "../../Firebase";
import s from "./Person.module.scss";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { getAuthStatus, removeUser, setUser } from "../../redux/slices/profile";
import { isEmpty } from "lodash";
import { firestore } from "../../Firebase";

export const getData = async (user: any, dispatch: any) => {
  if (user) {
    return await new Promise((resolve) =>
      firebase
        .firestore()
        .collection("users")
        .onSnapshot(async (snapshot) => {
          const newTimes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const personInfo = newTimes.filter((obj) => {
            return obj.id === user.uid;
          });
          dispatch(setUser(personInfo[0]));
          resolve(personInfo);
        })
    ).then((resolve) => {
      return isEmpty(resolve) ? 0 : 1;
    });
  }
};
const Person = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useAppDispatch();
  const { userInfo } = useSelector(getAuthStatus);

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  let navigate = useNavigate();

  React.useEffect(() => {
    !user && navigate("/authorization");
    if (user)
      if (isEmpty(userInfo)) {
        getData(user, dispatch);
      }
  }, [user]);

  const onSubmit = (data: any) => {
    if (user) {
      firestore
        .collection("users")
        .doc(user.uid)
        .update({
          uid: user.uid,
          email: data.email ? data.email : userInfo.email,
          first_name: data.first_name ? data.first_name : userInfo.first_name,
          last_name: data.last_name ? data.last_name : userInfo.last_name,
          middle_name: data.middle_name ? data.middle_name : userInfo.middle_name,
          birthday: data.birthday ? data.birthday : userInfo.birthday,
          numberPhone: data.numberPhone ? data.numberPhone : userInfo.numberPhone,
        });
      getData(user, dispatch);
    }
  };

  const signOutFunc = () => {
    signOut(auth);
    dispatch(removeUser());
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.inputsBlock}>
        <div className={s.block}>
          <label>Email</label>
          <input type="email" defaultValue={userInfo?.email} placeholder="Email" {...register("email")} />
        </div>
        <div className={s.block}>
          <label>Номер телефона</label>
          <input
            type="number"
            defaultValue={userInfo?.numberPhone}
            placeholder="Номер телефона"
            {...register("numberPhone")}
          />
        </div>
        <div className={s.block}>
          <label>Имя</label>
          <input type="text" defaultValue={userInfo?.first_name} placeholder="Имя" {...register("first_name")} />
        </div>
        <div className={s.block}>
          <label>Фамилия</label>
          <input type="text" defaultValue={userInfo?.middle_name} placeholder="Фамилия" {...register("middle_name")} />
        </div>
        <div className={s.block}>
          <label>Отчество</label>
          <input type="text" defaultValue={userInfo?.last_name} placeholder="Отчество" {...register("last_name")} />
        </div>
        <div className={s.block}>
          <label>Дата рождения</label>
          <input type="date" defaultValue={userInfo?.birthday} placeholder="Дата рождения" {...register("birthday")} />
        </div>
        <div className={s.buttons}>
          <button
            className={s.submit}
            onClick={() => {
              signOutFunc();
            }}
          >
            Выйти
          </button>
          <p>
            <input className={s.submit} type="submit" value={"Сохранить"} />
          </p>
        </div>
      </form>
    </div>
  );
};

export default Person;
