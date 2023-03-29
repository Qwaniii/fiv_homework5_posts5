import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../utils/Api"
import s from "./mycomment.module.css"


const MyComment = ({ comment }) => {

    const [post, setPost] = useState({})

    useEffect(() => {
        api.getPostById(comment.post)
            .then(data => setPost(data))
    }, [])

    // console.log(post)

    return (
        <div className={s.wrapper}>
            <Link to={`/fo_homework4_post4/post/${comment.post}`} style={{color: "inherit"}}>
                <div className={s.post}>
                    <div className={s.imgWrapper}>
                        <img src={post.image} alt={post.title} className={s.img}></img>
                    </div>
                    <div className={s.title}>
                        {post.title}
                    </div>
                </div>
            </Link>
            <div className={s.comment}>
                <div>Комментарий: </div>
                <div className={s.text}>"{comment.text}"</div>
            </div>
        </div>
    )
}

export default MyComment