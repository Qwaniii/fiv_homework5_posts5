import React, { useState } from "react";
import api from "../utils/Api";
import s from "./newpost.module.css";

export default function Newpost({
  setPopup,
  setPosts,
  anchorNewPost,
  setAnchorNewPost,
}) {

  const [newPostData, setNewPostData] = useState({
    title: "",
    text: "",
    image:
      "",
    tags: [],
  });

  // function clearForm() {
  //   setNewPostData = {}
  // }

  function handleCreatePost(e, data) {
    e.preventDefault();
    console.log(data);
    api
      .setNewPost(data)
      .then((res) => {
        console.log(res);
        setAnchorNewPost(!anchorNewPost)
      })
      .catch((err) =>{
        alert(
          `Не удалось создать пост, проверьте введенные данные. Ошибка - ${err}`
        )}
      );
    setPopup(false);
    // clearForm();
  }

  const backgroundImage = "https://www.sundayairlines.kz/local/frontend/dist/img/no_pic.24654b31.jpg"

  console.log(newPostData)
  
  return (
    <>
      <div className={s.container}>
        <h3>Создание поста</h3>
        <form
          className={s.form}
          onSubmit={(e) =>
            handleCreatePost(e, newPostData)
          }
        >
          <input
            type="text"
            placeholder="Заголовок поста"
            value={newPostData.title}
            onChange={(e) => {
              setNewPostData((prevState) => ({...prevState, title: e.target.value.toString()}));
            }}
            required
          ></input>
          <textarea
            name="descr"
            placeholder="Тест поста"
            value={newPostData.text}
            onChange={(e) => {
                setNewPostData((prevState) => ({...prevState, text: e.target.value.toString()}));
            }}
            required
          ></textarea>
          {/* <div className={s.imgWrapper}> */}
            <img className={s.image} src={newPostData.image.length < 1 ? backgroundImage : newPostData.image} alt={newPostData.title}></img>
          {/* </div> */}
          <input
            type="text"
            name="imgLink"
            placeholder="Ссылка на изображение"
            value={newPostData.image}
            onChange={(e) => setNewPostData((prevState) => ({...prevState, image: e.target.value.toString()}))}
          ></input>
          <input
            type="text"
            placeholder="Введите тэги, через запятую"
            value={newPostData.tags.join()}
            onChange={(e) =>
              setNewPostData((prevState) => ({...prevState, tags: e.target.value.replace(/\s/g, "").split(",")}))
            }
          ></input>
          <input type="submit" value="Создать пост"></input>
        </form>
      </div>
    </>
  );
}
