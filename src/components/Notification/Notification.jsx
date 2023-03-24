import React from 'react'
import s from "./notification.module.css"
import cn from "classnames"
import CloseIcon from '@mui/icons-material/Close';


export default function Notification({ title, text, children, color, close }) {

  const handleClose = () => {
    close(false)
  }

  return (
    <div className={cn(s.standart, {[s.color]: color})}>
      <h3 className={s.title}>{title}</h3>
      <p className={s.text}>{text}</p>
      <p>{children}</p>
      {close && <div className={s.close} onClick={() => handleClose()}><CloseIcon/></div>}
    </div>
  )
}
