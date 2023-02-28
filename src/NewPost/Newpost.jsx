import React, { useState } from "react"
import api from "../utils/Api";
import s from "./newpost.module.css"


export default function Newpost({ setPopup }) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [postImg, setPostImg] = useState("");
    const [postTags, setPostTags] = useState([]);
    const [newPostData, setNewPostData] = useState({});

    setNewPostData({title: title, text: postText, image: postImg, tags: postTags})

    function clearForm() {
        setTitle("");
        setPostText("");
        setPostImg("");
        setPostTags([]);
    }


    function handleCreatePost(e, data) {
        e.preventDefault();
        console.log(data)
        // api.setNewPost(data)
        //     .then((data) => console.log(data))
        //     .catch(err => console.log(err))
        setPopup(false);
        clearForm();
    }


    return (
    <>
        <div className={s.container}>
            <form action="">
                <input type="text" placeholder="Заголовок поста" requred="true" value={title} onChange={(e) => {setTitle((e.target.value).toString())}}></input>
                <textarea name="descr" placeholder="Тест поста" requred="true" onChange={(e) => {setPostText((e.target.value).toString())}} ></textarea>
                <img src={postImg} alt="image"></img>
                <input type="text" name="imgLink" placeholder="Ссылка на изображение" onChange={(e) => setPostImg((e.target.value).toString())}></input>
                <input type="text" placeholder="Введите тэги, через запятую" onChange={(e) => setPostTags(((e.target.value).replace(/\s/g, "")).split(","))} ></input>
                <button type="submit" onClick={(e) => handleCreatePost(e, newPostData)}>Создать пост</button>
            </form>
        </div>
    </>
    )
} 

