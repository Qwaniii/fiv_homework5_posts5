import React, { useState } from "react";
import api from "../utils/Api";
import s from "./newpost.module.css";

export default function Newpost({
  setPopup,
  setPosts,
  anchorNewPost,
  setAnchorNewPost,
}) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState(
    "https://www.sundayairlines.kz/local/frontend/dist/img/no_pic.24654b31.jpg"
  );
  const [postTags, setPostTags] = useState([]);
  const [newPostData, setNewPostData] = useState({
    title: "",
    text: "",
    image:
      "https://www.sundayairlines.kz/local/frontend/dist/img/no_pic.24654b31.jpg",
    tags: [],
  });

  function clearForm() {
    setTitle("");
    setPostText("");
    setPostImg(
      "https://www.sundayairlines.kz/local/frontend/dist/img/no_pic.24654b31.jpg"
    );
    setPostTags([]);
  }

  function handleCreatePost(e, data) {
    e.preventDefault();
    console.log(data);
    api
      .setNewPost(data)
      .then((data) => {
        console.log(data);
        setAnchorNewPost(!anchorNewPost)
      })
      .catch((err) =>
        alert(
          `Не удалось создать пост, проверьте введенные данные. Ошибка - ${err}`
        )
      );
    setPopup(false);
    clearForm();
  }

  console.log(newPostData)

  return (
    <>
      <div className={s.container}>
        <form
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
          <img className={s.image} src={postImg} alt="image"></img>
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
