import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Notification from '../Notification/Notification';
import CloseIcon from '@mui/icons-material/Close';
import s from "./login.module.css"
import api from '../../utils/Api';
import { useLocation, useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useDispatch } from 'react-redux';
import { notificPassAction } from '../../storage/reducers/modalReducer';


export default function ForgotPassword({ modalResetPass, setModalResetPass }) {

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
    }
  });

  const [messageFromApi, setMessageFromApi] = useState({message: "", status: false})
  const [hiddenPass, setHiddenPas] = useState(false)
  const dispatch = useDispatch()


  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setMessageFromApi({message: "", status: false})
    dispatch(notificPassAction(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleForgot(email) {
    console.log(email)
    api.forgotPassword(email)
      .then((data) => {
        console.log(data.message)
        setMessageFromApi(prevState => ({...prevState, message: data.message, status: true}))
        setTimeout(() => {
          setMessageFromApi(prevState => ({...prevState, message: ""}))
        }, 4000)
      })
      .catch(err => {
        console.log(`Error ${err.status}`)
        err.json()
          .then(data => {
            console.log(data.message)
            setMessageFromApi(prevState => ({...prevState, message: data.message, status: false}))
            setTimeout(() => {
              setMessageFromApi(prevState => ({...prevState, message: ""}))
            }, 4000)
          })
      })
  }

  const handleReset = (data) => {
    const pass = {password: data.password}
    api.resetPassword(pass, data.token)
      .then(data => {
        console.log(data)
        setModalResetPass(false)
        navigate("/fo_homework4_post4/login")
        dispatch(notificPassAction(true))
        reset()
      })
      .catch(err => {
        console.log(`Error ${err.status}`)
        err.json()
          .then(data => {
            console.log(data.message)
            alert(data.message)
          })
      })
  }

  useEffect(() => {
    if(location.pathname.includes("reset-password")) setModalResetPass(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setModalResetPass, location])

  const toLogin = () => {
    setModalResetPass(false)
    navigate("/fo_homework4_post4/login")
  }


  return (
    <div className={s.container}>
      <div className={s.wrapperPass}>
        <h3>
          Напомнить пароль
        </h3>
        {messageFromApi.status === false
        ?
        <>
        <form action='forgot' onSubmit={handleSubmit(handleForgot)}>
          <div className={s.item}>
            <input id="forgotEmail" type="text" className={s.input} placeholder=" " defaultValue = {watch("email")} {...register("email", {
              required: "Необходимо ввести e-mail", 
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Введите свой email"
              }
            })}></input>
            <label htmlFor="forgotEmail" className={s.label}>Введите e-mail</label>
            {errors?.email && <span className={s.error}>*{errors?.email?.message}</span>}
          </div>
          <div className={s.messagePass}>* Введите свой e-mail, на него будет отправлен код подтверждения</div>
          <input type="submit" className={s.enter} value="Отправить"></input>
        </form>
        <div className={s.footer}>
          <div className={s.registr} onClick={() => toLogin()}>Войти</div>
        </div>
        </>
        :
        <>
        <form action='forgot' onSubmit={handleSubmit(handleReset)}>
          <div className={s.item}>
            <textarea id="token" type="text" className={s.textarea} placeholder=" " defaultValue = {watch("token")} {...register("token", {
              required: "Введите код из письма", 
            })}></textarea>
            <label htmlFor="token" className={s.label}>Вставьте код из письма</label>
            {errors?.email && <span className={s.error}>*{errors?.email?.message}</span>}
          </div>
          <div className={s.item}>
            <input id="newPassword" type={hiddenPass ? "text" : "password"} className={s.input} placeholder=" " defaultValue = {watch("password")}  {...register("password", {
              required: "Необходимо ввести пароль", 
                minLength: {
                  value: 5, 
                  message: "Введите больше 5 знаков"
                }
            })}></input>
            <label htmlFor="newPassword" className={s.label}>Введите новый пароль</label>
            {errors?.password && <span className={s.error}>*{errors?.password?.message}</span>}
            <div className={s.eyes} onClick={() => setHiddenPas(!hiddenPass)}>{hiddenPass ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}</div>
          </div>
          <input type="submit" className={s.enter} value="Отправить"></input>
        </form>
        <div className={s.footer}>
          <div className={s.registr} onClick={() => toLogin()}>Войти</div>
        </div>
        </>
        }
        <div className={s.close} onClick={() => setModalResetPass(false)}><CloseIcon/></div>
      </div>
      {messageFromApi.message && <div className={s.errorFetch}>
        {messageFromApi.status === true 
        ?
        <Notification title="Отлично" text={messageFromApi.message}/>
        :
        <Notification title="Что-то не так..." text={messageFromApi.message} color={true}>
          Попробуйте еще раз
        </Notification>}
      </div>}
    </div>
  )
}
