import React, { useEffect } from 'react'
import s from "./uppernotific.module.css"

export default function UpperNotific({message, color, visible, setVisible}) {

  useEffect(() => {
      if (visible) {
      const timer = setTimeout(() => {
        setVisible(false)
        return () => {
          clearTimeout(timer)
        } 
      }, 5000)
    }
  }, [setVisible, visible]) 

  return (
      <div className={`${s.container} ${visible && s.visible}`}>
        <div className={`${s.inner} ${color && s.color}`}>
          {message}
        </div>
      </div>
  )
}
