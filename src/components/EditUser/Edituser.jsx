import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import s from "./edituser.module.css"

export default function Edituser() {

  const { currentUser } = useContext(UserContext)
  console.log(currentUser)

  return (
    <div className={s.container}>
      <form action="">
                <img className={s.image} src={currentUser.avatar} alt="image"></img>
                <input type="text" name="imgLink" placeholder="Ссылка на изображение" value={currentUser.avatar}></input>
                <input type="text" placeholder="Имя" value={currentUser.name} required></input>
                <input type="text" placeholder="Обо мне" value={currentUser.about}></input>
                <input type="text" placeholder="E-email" value={currentUser.email} disabled></input>
                <input type="submit" value="Сохранить изменения" ></input>
            </form>
    </div>
  )
}
