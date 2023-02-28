import React, { useState } from "react"
import api from "../utils/Api";
import s from "./newpost.module.css"


export default function Newpost({ setPopup }) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [postImg, setPostImg] = useState("");
    const [postTags, setPostTags] = useState([]);
    const [newPostData, setNewPostData] = useState({});


    function clearForm() {
        setTitle("");
        setPostText("");
        setPostImg("");
        setPostTags([]);
    }


    function handleCreatePost(e, data) {
        console.log(data)
        // api.setNewPost(data)
        //     .then((data) => console.log(data))
        //     .catch(err => console.log(err))
        setPopup(false);
        clearForm();
        e.preventDefault();
    }


    return (
    <>
        <div className={s.container}>
            <form action="" onSubmit={(e) => handleCreatePost(e, {title: title, text: postText, image: postImg, tags: postTags})}>
                <input type="text" placeholder="Заголовок поста" value={title} onChange={(e) => {setTitle((e.target.value).toString())}} required></input>
                <textarea name="descr" placeholder="Тест поста"  value={postText} onChange={(e) => {setPostText((e.target.value).toString())}} required></textarea>
                <img src={postImg} alt="image"></img>
                <input type="text" name="imgLink" placeholder="Ссылка на изображение" value={postImg} onChange={(e) => setPostImg((e.target.value).toString())}></input>
                <input type="text" placeholder="Введите тэги, через запятую" value={postTags.join()} onChange={(e) => setPostTags(((e.target.value).replace(/\s/g, "")).split(","))} ></input>
                <input type="submit" value="Создать пост" ></input>
            </form>
        </div>
    </>
    )
} 

