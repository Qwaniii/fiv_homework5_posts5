import React, { useEffect, useState } from 'react'
import s from "./login.module.css"
import { useForm } from "react-hook-form";
import api from '../../utils/Api';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Notification from '../Notification/Notification';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


export default function Registration({ modalRegistr, setModalRegistr, setUserLogin }) {

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "", 
      password: "",
    }
  });
  const navigate = useNavigate()
  const location = useLocation()
  const [errorFetch, setErrorFetch] = useState("")
  const [hiddenPass, setHiddenPas] = useState(false)


  function handleLogin(obj) {
    api.signUp({...obj, group: "group-10"})
      .then((data) => {
        console.log(data)
        setUserLogin(prevState => ({...prevState, password: obj.password, email: data.email}))
        setModalRegistr(false)
        navigate("/fo_homework4_post4/login")
        reset()
      })
      .catch(err => {
        console.log(`Error ${err.status}`)
        err.json()
          .then(data => {
            console.log(data)
            setErrorFetch(data.message)
            setTimeout(() => {
              setErrorFetch("")
            }, 5000)
          })
      })
  }

  useEffect(() => {
    reset()
    setErrorFetch("")
    setHiddenPas(false)
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
        <form action='registration' onSubmit={handleSubmit(handleLogin)}>
          <div className={s.item}>
            <input id="emailReg" type="text" className={s.input} placeholder=" " defaultValue = {watch("email")} {...register("email", {
              required: "Необходимо ввести e-mail", 
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Введите корректный email"
              }
            })}></input>
            <label htmlFor="emailReg" className={s.label}>E-mail</label>
            {errors?.email && <span className={s.error}>*{errors?.email?.message}</span>}
          </div>
          <div className={s.item}>
            <input id="passwordReg" type={hiddenPass ? "text" : "password"} className={s.input} placeholder=" " {...register("password", {
              required: "Необходимо ввести пароль", 
                minLength: {
                  value: 5, 
                  message: "Введите больше 5 знаков"
                }
            })}></input>
            <label htmlFor="passwordReg" className={s.label}>Пароль</label>
            {errors?.password && <span className={s.error}>*{errors?.password?.message}</span>}
            <div className={s.eyes} onClick={() => setHiddenPas(!hiddenPass)}>{hiddenPass ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}</div>
          </div>
          <input type="submit" className={s.enter} value="Регистрация"></input>
        </form>
        <div className={s.footerRegistr}>
          <div className={s.registr} onClick={() => toLogin()}>Войти</div>
        </div>
        <div className={s.close} onClick={() => setModalRegistr(false)}><CloseIcon/></div>
      </div>
      {errorFetch && <div className={s.errorFetch}>
        <Notification title="Ошибка" text={errorFetch} color={true}>
          <div>Просто войдите...</div>
        </Notification>
      </div>}
    </div>
  )
}
