import React, { useState } from 'react'
import api, { config } from '../../utils/Api';
import s from "./login.module.css"
import { useForm } from "react-hook-form";

export default function Login() {

  const [obj, setObj] = useState({})
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

console.log({errors})

  function handleLoginCookies(e, obj) {
    e.preventDefault();
    console.log("api =",api._token)
    // document.cookie = `Login=${login};`;
    // document.cookie = `Password=${password};`;
    api.signIn(obj)
      .then((data) => {
        console.log(data)
        sessionStorage.setItem('token', data.token)
        document.cookie = `token=${data.token};`;
        // console.log("api =",api._token, "config = ", config.token)
        console.log(api._token)
      })
      .catch(err => console.log(err))
      setObj({})
  }




  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h3>
          Авторизация
        </h3>
        <form action='login' onSubmit={handleSubmit(onSubmit)}>
          <div className={s.email}>
            <input type="text" placeholder="Email" {...register("email", {
              required: {
              value: true,
              message: "Необходимо ввести e-mail"
            }, 
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Введите корректный email"
            }})}></input>
            {errors?.email && <span className={s.error}>*{errors?.email?.message}</span>}
          </div>
          <div className={s.password}>
            <input type="text" placeholder="Пароль" {...register("password", {
              required: {
                value: true,
                message: "Необходимо ввести пароль"
                }, 
                minLength: {
                  value: 5, 
                  message: "Введите больше 5 знаков"
                }})}></input>
            {errors?.password && <span className={s.error}>*{errors?.password?.message}</span>}
          </div>
          <input type="submit" value="Зарегистрироваться"></input>
          <input type="submit" value="Войти"></input>
        </form>
        <button>Забыли пароль?</button>
      </div>
    </div>
  )
}
