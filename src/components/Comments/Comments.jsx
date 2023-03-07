import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import s from "./comments.module.css"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { UserContext } from '../../Context/UserContext';
import api from '../../utils/Api';


export default function Comments({ comment, anchor, setAnchor, modalAbout, setModalAbout, setCommentInfo }) {

    const { currentUser } = useContext(UserContext)

    const isAuthor = comment.author._id === currentUser._id ? true : false;
    const created = new Date(comment.created_at);

    function handleDeleteComment(e, postId, commentId) {
        e.preventDefault();
        api.deleteComment(postId, commentId)
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
            .finally(() => setAnchor(!anchor))
    }



  return (
    <div>
        <div className={s.container}>
            <div className={s.inner}>
                <div className={s.author}>
                    <div className={s.avatar} onClick={() => {setModalAbout(true); setCommentInfo(comment);}}>
                        <img src={comment?.author?.avatar} alt={comment?.author?.name}></img>
                    </div>
                    <div className={s.info}>
                        <div className={s.name} onClick={() => {setModalAbout(true); setCommentInfo(comment);}}>
                            {comment?.author?.name}
                        </div>
                        <div className={s.date}>
                            {created.toLocaleDateString("ru-RU", {
                                month: "2-digit",
                                day: "numeric",
                                year: "numeric",
                            })}
                            <span className={s.time}>{created.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                    </div>
                    {isAuthor && <div className={s.delete}><DeleteOutlinedIcon onClick={(e) => handleDeleteComment(e, comment.post, comment._id)}/></div>}
                </div>
                <Typography variant="body2" color="text.primary" className={s.text}>
                    {comment.text}
                </Typography >
            </div>
        </div>
    </div>
  )
}
