import React from 'react'
import s from "./secondpopup.module.css"
import cn from "classnames"

export default function SecondPopup({ popup, setPopup, children }) {
  return (
    <div className={cn(s.modal, {[s.active]: popup})} onClick={() => setPopup(false)}>
        <div className={cn(s.content, {[s.active]: popup})} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}
