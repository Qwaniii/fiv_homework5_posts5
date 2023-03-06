import React, { useState } from 'react'
import api, { config } from '../../utils/Api';
import s from "./login.module.css"

export default function Login() {

  const [obj, setObj] = useState({})

  console.log(api._token)

  function handleLoginCookies(e, obj) {
    e.preventDefault();
    console.log("api =",api._token)
    // document.cookie = `Login=${login};`;
    // document.cookie = `Password=${password};`;
    api.signIn(obj)
      .then((data) => {
        console.log(data)
        sessionStorage.setItem('token', data.token)
        document.cookie = `token=${data.token};`;
        // console.log("api =",api._token, "config = ", config.token)
        console.log(api._token)
      })
      .catch(err => console.log(err))
      setObj({})
  }

  console.log(obj)



  return (
    <div>
      <form action='login' onSubmit={(e) => handleLoginCookies(e, obj)}>
        <div className=''>
          <label htmlFor='login'>Логин</label>
          <input id="login" name="email" type="text" placeholder="Логин" onChange={(e) => setObj({...obj, [e.target.name]: e.target.value})}></input>
        </div>
        <div className='password'>
          <label htmlFor='pass'>Пароль</label>
          <input id="pass" name="password" type="text" placeholder="Пароль" onChange={(e) => setObj({...obj, [e.target.name]: e.target.value})}></input>
        </div>
        <input type="submit"></input>
      </form>
    </div>
  )
}
