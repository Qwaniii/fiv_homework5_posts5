import React, { useEffect, useState } from 'react'
import s from "./login.module.css"
import { useForm } from "react-hook-form";
import api from '../../utils/Api';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Notification from '../Notification/Notification';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { notificPassAction } from '../../storage/reducers/modalReducer';

export default function Login({ modalLogin, setModalLogin, setIsAuth, userLogin, setUserLogin, setIsSuccess }) {

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
  const [errorFetch, setErrorFetch] = useState("")
  const [hiddenPass, setHiddenPas] = useState(false)
  const dispatch = useDispatch();
  const modalPass = useSelector(state => state.modal.modalNotificationPass)

  //автоматический вход после регистрации
  useEffect(() => {
    if(userLogin) {
      handleLogin(userLogin)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogin])

  //
  useEffect(() => {
    if (modalPass === true) {
      const timer = setTimeout(() => {
        //удаление сообщение об успешной смене пароля
        dispatch(notificPassAction(false))
      }, 4000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [dispatch, modalPass])

  function handleLogin(obj) {
    api.signIn(obj)
      .then((data) => {
        console.log(data)
        sessionStorage.setItem('token', data.token)
        setIsAuth(true)
        setModalLogin(false)
        setUserLogin(prevState => ({...prevState, name: data.data.name}))
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          setUserLogin(null)
        }, 2500)
        if (location.pathname.includes('/login') && !location.state) {
             navigate("/fo_homework4_post4")
            } else navigate(location.state.pathname)
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
            }, 4000)
          })
      })
  }

  useEffect(() => {
    reset()
    setErrorFetch("")
    setHiddenPas(false)
  }, [modalLogin, reset])

  useEffect(() => {
    if(location.pathname.includes("login") && !userLogin) setModalLogin(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setModalLogin, location])

  const toRegistr = () => {
    setModalLogin(false)
    navigate("/fo_homework4_post4/registration")
  }

  const toReset = () => {
    setModalLogin(false)
    navigate("/fo_homework4_post4/reset-password")
  }


  return (
    <>
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
            <input id="password" type={hiddenPass ? "text" : "password"} className={s.input} placeholder=" " defaultValue = {watch("password")}  {...register("password", {
              required: "Необходимо ввести пароль", 
                minLength: {
                  value: 5, 
                  message: "Введите больше 5 знаков"
                }
            })}></input>
            <label htmlFor="password" className={s.label}>Пароль</label>
            {errors?.password && <span className={s.error}>*{errors?.password?.message}</span>}
            <div className={s.eyes} onClick={() => setHiddenPas(!hiddenPass)}>{hiddenPass ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}</div>
          </div>
          <input type="submit" className={s.enter} value="Войти"></input>
        </form>
        <div className={s.footer}>
          <div className={s.registr} onClick={() => toRegistr()}>Зарегистрироваться</div>
          <div className={s.forgot} onClick={() => toReset()}>Напомнить пароль</div>
        </div>
        <div className={s.close} onClick={() => setModalLogin(false)}><CloseIcon/></div>
      </div>
      {errorFetch && <div className={s.errorFetch}>
        <Notification title="Ошибка" text={errorFetch} color={true}>
          <div>Попробуйте еще раз</div>
        </Notification>
      </div>}
      {modalPass && <div className={s.errorFetch}>
        <Notification title="Отлично" text="Пароль успешно изменен" >
          Теперь авторизируйтесь
        </Notification>
      </div>}
    </div>
    </>
  )
}
