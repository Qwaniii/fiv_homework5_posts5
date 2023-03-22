import React from 'react'
import Login from '../components/Login/Login'

export default function LoginPage({ setModalLogin, setIsAuth }) {
  return (
    <div>
      <Login setModalLogin={setModalLogin} setIsAuth={setIsAuth}/>
    </div>
  )
}
