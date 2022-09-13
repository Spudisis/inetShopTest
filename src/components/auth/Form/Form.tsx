import React from "react";
import s from "./Form.module.scss";
import AuthGoogle from "../AuthGoogle/AuthGoogle";

const Form = ({ title, handleClick }: any) => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  return (
    <div className={s.form}>
      <div className={s.formBlock}>
        <label>Логин</label>
        <input className={s.input} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={s.formBlock}>
        <label>Пароль</label>
        <input className={s.input} type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
      </div>
      <AuthGoogle />
      <button className={s.button} onClick={() => handleClick(email, pass)}>
        {title}
      </button>
    </div>
  );
};

export default Form;
