import React, { useEffect } from 'react'
import s from "./login.module.css"
import { useForm } from "react-hook-form";
import api from '../../utils/Api';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function Registration({ modalRegistr, setModalRegistr }) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "", 
      password: "",
    }
  });
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogin(obj) {
    api.signUp({...obj, group: "group-10"})
      .then((data) => {
        console.log(data)

        setModalRegistr(false)
        navigate("/fo_homework4_post4")
        reset()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    reset()
  }, [modalRegistr, reset])

  useEffect(() => {
    if(location.pathname.includes("registration")) setModalRegistr(true)
  }, [setModalRegistr, location])

  const toLogin = () => {
    setModalRegistr(false)
    navigate("/fo_homework4_post4/login")
  }


  return (
    <div className={s.container}>
      <div className={s.wrapperRegistr}>
        <h3>
          Регистрация
        </h3>
        <form action='login' onSubmit={handleSubmit(handleLogin)}>
          <div className={s.item}>
            <input id="email" type="text" className={s.input} placeholder=" " {...register("email", {
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
            <input id="password" type="text" className={s.input} placeholder=" " {...register("password", {
              required: "Необходимо ввести пароль", 
                minLength: {
                  value: 5, 
                  message: "Введите больше 5 знаков"
                }
            })}></input>
            <label htmlFor="password" className={s.label}>Пароль</label>
            {errors?.password && <span className={s.error}>*{errors?.password?.message}</span>}
          </div>
          <input type="submit" className={s.enter} value="Регистрация"></input>
        </form>
        <div className={s.footerRegistr}>
          <div className={s.registr} onClick={() => toLogin()}>Войти</div>
        </div>
        <div className={s.close} onClick={() => setModalRegistr(false)}><CloseIcon/></div>
      </div>
    </div>
  )
}
