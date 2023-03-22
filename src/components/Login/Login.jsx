import React, { useEffect, useState } from 'react'
import s from "./login.module.css"
import { useForm } from "react-hook-form";
import api from '../../utils/Api';
import { useNavigate } from 'react-router-dom';

export default function Login({ setModalLogin, setIsAuth }) {

  // eslint-disable-next-line no-unused-vars
  const [obj, setObj] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()

  // eslint-disable-next-line no-unused-vars
  function handleLogin(obj) {
    // document.cookie = `Login=${login};`;
    // document.cookie = `Password=${password};`;

    api.signIn(obj)
      .then((data) => {
        console.log(data)
        sessionStorage.setItem('token', data.token)
        setIsAuth(true)
        navigate("/fo_homework4_post4")
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    setModalLogin(true)
  }, [setModalLogin])


  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h3>
          Авторизация
        </h3>
        <form action='login' onSubmit={handleSubmit(handleLogin)}>
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
