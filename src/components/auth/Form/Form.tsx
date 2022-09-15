import React from "react";
import s from "./Form.module.scss";
import AuthGoogle from "../AuthGoogle/AuthGoogle";
import { useForm } from "react-hook-form";
const Form = ({ title, handleClick, result }: any) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => handleClick(data);
  return (
    <div className={s.form}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.formBlock}>
          <label className={s.inputLabel}>Логин</label>
          <input className={s.input} type="email" placeholder="Email" {...register("email")} />
        </div>
        <div className={s.formBlock}>
          <label className={s.inputLabel}>Пароль</label>
          <input className={s.input} type="password" placeholder="Password" {...register("password")} />
          <div>
            {title === "Войти"
              ? result && <label className={s.labelError}>Неверный пароль или логин</label>
              : result && <label className={s.labelError}>Пароль должен быть от 6 символов</label>}
          </div>
        </div>
        <input className={s.button} type="submit" value={title} />
      </form>
      {/* <AuthGoogle /> */}
    </div>
  );
};

export default Form;
