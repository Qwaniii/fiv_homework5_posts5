import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import api from "../../utils/Api";
import s from "./edituser.module.css";

export default function Edituser({ setPopup, anchorEditUser, setAnchorEditUser }) {
  
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [avatarUser, setAvatarUser] = useState({avatar: currentUser.avatar});
  const [userObj, setUserObj] = useState({name: currentUser.name, about: currentUser.about})



  function handleEditUserInfo(e, data, avatar) {
    e.preventDefault();
    api
      .editUserDataInfo(data)
      .then((resp) => {
        console.log("data",resp);
        api
          .editUserAvatar(avatar)
          .then((resp) => {
          console.log("avatar", resp)
          setAnchorEditUser(!anchorEditUser)})
          .catch((err) => alert("Ошибка, неправильный формат аватара", err));
      })
      .catch((err) => alert("Ошибка редактирования учетной записи",err));

    setPopup(false)
  }
  
  console.log(userObj)
  console.log(avatarUser)

  return (
    <div className={s.container}>
      <form onSubmit={(e) => {
        handleEditUserInfo(e, userObj, avatarUser)}
        }>
        <img className={s.image} src={avatarUser.avatar} alt="image"></img>
        <label htmlFor="img">Image:</label>
        <input
          type="text"
          id="img"
          name="imgLink"
          placeholder="Ссылка на изображение"
          value={avatarUser.avatar}
          onChange={(e) => {
            setAvatarUser((prevState) => ({...prevState, avatar: e.target.value.toString()}));
          }}
        ></input>
        {/* <input type="submit" value="Сохранить изменения"></input>
      </form>
      <form onSubmit={(e) => handleEditUserInfo(e, {name: nameUser, about: aboutUser}, {avatar: avatarUser})}> */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Имя"
          value={userObj.name}
          onChange={(e) => {
            setUserObj((prevState) => ({...prevState, name: e.target.value.toString()}));
          }}
          required
        ></input>
        <label htmlFor="about">Информация:</label>
        <input
          type="text"
          id="about"
          placeholder="Обо мне"
          value={userObj.about}
          onChange={(e) => {
            setUserObj((prevState) => ({...prevState, about: e.target.value.toString()}));
          }}
          required
        ></input>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder="E-email"
          value={currentUser.email}
          disabled
        ></input>
        <input type="submit" value="Сохранить изменения"></input>
        <button type="button" onClick={() => setPopup(false)}>Cancel</button>
      </form>
    </div>
  );
}
