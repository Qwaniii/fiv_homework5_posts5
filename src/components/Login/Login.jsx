import React, { useEffect } from 'react'
import s from "./login.module.css"
import { useForm } from "react-hook-form";
import api from '../../utils/Api';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function Login({ modalLogin, setModalLogin, setIsAuth }) {

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "", 
      password: "",
    }
  });
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogin(obj) {
    api.signIn(obj)
      .then((data) => {
        console.log(data)
        sessionStorage.setItem('token', data.token)
        setIsAuth(true)
        setModalLogin(false)
        navigate("/fo_homework4_post4")
        reset()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    reset()
  }, [modalLogin, reset])

  useEffect(() => {
    if(location.pathname.includes("login")) setModalLogin(true)
  }, [setModalLogin, location])

  const toRegistr = () => {
    setModalLogin(false)
    navigate("/fo_homework4_post4/registration")
  }


  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h3>
          Авторизация
        </h3>
        <form action='login' onSubmit={handleSubmit(handleLogin)}>
          <div className={s.item}>
            <input id="email" type="text" className={s.input} placeholder=" " defaultValue = {watch("email")} {...register("email", {
              required: "Необходимо ввести e-mail", 
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Введите корректный email"
              }
            })}></input>
            <label htmlFor="email" className={s.label}>E-mail</label>
            {errors?.email && <span className={s.error}>*{errors?.email?.message}</span>}
          </div>
          <div className={s.item}>
            <input id="password" type="text" className={s.input} placeholder=" " defaultValue = {watch("password")}  {...register("password", {
              required: "Необходимо ввести пароль", 
                minLength: {
                  value: 5, 
                  message: "Введите больше 5 знаков"
                }
            })}></input>
            <label htmlFor="password" className={s.label}>Пароль</label>
            {errors?.password && <span className={s.error}>*{errors?.password?.message}</span>}
          </div>
          <input type="submit" className={s.enter} value="Войти"></input>
        </form>
        <div className={s.footer}>
          <div className={s.registr} onClick={() => toRegistr()}>Зарегистрироваться</div>
          <div className={s.forgot}>Напомнить пароль</div>
        </div>
        <div className={s.close} onClick={() => setModalLogin(false)}><CloseIcon/></div>
      </div>
    </div>
  )
}
