import React, { useState } from "react";
import api from "../../utils/Api";
import s from "./newpost.module.css";

export default function Newpost({
  setPopup,
  setPosts,
  anchorNewPost,
  setAnchorNewPost,
}) {
  
  const backgroundImage = "https://www.sundayairlines.kz/local/frontend/dist/img/no_pic.24654b31.jpg"
  const [newPostData, setNewPostData] = useState({
    title: "",
    text: "",
    image: "",
    tags: null,
  });

  // function clearForm() {
  //   setNewPostData = {}
  // }

  function handleCreatePost(e, data) {
    e.preventDefault();
    for (let key in data) {
      if (!data[key]) delete data[key]
    }
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
            <img className={s.image} src={newPostData.image || backgroundImage} alt={newPostData.title}></img>
          {/* </div> */}
          <input
            type="text"
            name="imgLink"
            placeholder="Ссылка на изображение"
            onChange={(e) => setNewPostData((prevState) => ({...prevState, image: (e.target.value.toString() || backgroundImage)}))}
          ></input>
          <input
            type="text"
            placeholder="Введите тэги, через запятую"
            defaultValue={newPostData?.tags?.join()}
            onChange={(e) =>
              setNewPostData((prevState) => ({...prevState, tags: e.target.value.replace(/\s/g, "").split(",")}))
            }
          ></input>
          <div className={s.footer}>
            <input className={s.btn} type="submit" value="Добавить пост"></input>
            <button className={s.btn} type="button" onClick={() => setPopup(false)}>Отмена</button>
          </div>
          <span className={s.close} onClick={() => setPopup(false)}>&times;</span>
        </form>
      </div>
    </>
  );
}
