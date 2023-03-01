import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import api from "../../utils/Api";
import s from "./edituser.module.css";

export default function Edituser({ setPopup }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [nameUser, setNameUser] = useState(currentUser.name);
  const [aboutUser, setAboutUser] = useState(currentUser.about);
  const [avatarUser, setAvatarUser] = useState(currentUser.avatar);

  function handleEditUserInfo(e, data, avatar) {
    e.preventDefault();
    api
      .editUserDataInfo(data)
      .then((resp) => {
        console.log("data",resp);
        setCurrentUser(resp);
      })
      .catch((err) => alert(err));
    // api
    //   .editUserAvatar(avatar)
    //   .then((resp) => {
    //     console.log("avatar", resp)
    //     setCurrentUser(resp)})
    //   .catch((err) => alert(err));
    setPopup(false)
  }


  return (
    <div className={s.container}>
      <form onSubmit={(e) => handleEditUserInfo(e, {name: nameUser, about: aboutUser}, {avatar: avatarUser})}>
        <img className={s.image} src={avatarUser} alt="image"></img>
        <label htmlFor="img">Image:</label>
        <input
          type="text"
          id="img"
          name="imgLink"
          placeholder="Ссылка на изображение"
          value={avatarUser}
          onChange={(e) => {
            setAvatarUser(e.target.value.toString());
          }}
        ></input>
        <input type="submit" value="Сохранить изменения"></input>
      </form>
      <form onSubmit={(e) => handleEditUserInfo(e, {name: nameUser, about: aboutUser}, {avatar: avatarUser})}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Имя"
          value={nameUser}
          onChange={(e) => {
            setNameUser(e.target.value.toString());
          }}
          required
        ></input>
        <label htmlFor="about">Информация:</label>
        <input
          type="text"
          id="about"
          placeholder="Обо мне"
          value={aboutUser}
          onChange={(e) => {
            setAboutUser(e.target.value.toString());
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
        <button type="button">Cancel</button>
      </form>
    </div>
  );
}
