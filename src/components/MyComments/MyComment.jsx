import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../utils/Api"
import s from "./mycomment.module.css"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';



const MyComment = ({ comment, setModalDelete, setConfirmDelete, anchor, setAnchor}) => {

    const [post, setPost] = useState({})
    const [deleteActive, setDeleteActive] = useState(false)

    useEffect(() => {
        api.getPostById(comment.post)
            .then(data => setPost(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    function handleDeleteComment(postId, commentId) {
        api.deleteComment(postId, commentId)
            .then((data) => console.log(data))
            .catch((err) => {
                console.log(err.status)
                err.json()
                    .then(res => console.log(res.message))
            })
            .finally(() => setAnchor(!anchor))
        setModalDelete(false)
        setConfirmDelete(() => () => null)
    }

    const deleteComment = () => {
        setModalDelete(true)
        setConfirmDelete(() => () => handleDeleteComment(comment.post, comment._id))
      }

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
            <div className={s.comment} onMouseMove={() => setDeleteActive(true)} onMouseLeave={() => setDeleteActive(false)}>
                <div>Комментарий: </div>
                <div className={s.text}>"{comment.text}"</div>
                {deleteActive && <div className={s.delete} title="Удалить комментарий"><DeleteOutlinedIcon onClick={deleteComment/* (e) => handleDeleteComment(e, comment.post, comment._id) */}/></div>}
            </div>
        </div>
    )
}

export default MyComment