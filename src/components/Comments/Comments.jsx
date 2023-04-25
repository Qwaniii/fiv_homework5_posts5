import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import s from "./comments.module.css"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { UserContext } from '../../Context/UserContext';
import api from '../../utils/Api';
import { PostsContext } from '../../Context/PostsContext';


export default function Comments({ comment, setPostComments, setModalAbout, setCommentInfo, setModalDelete, setConfirmDelete }) {

    const { currentUser, setMyComments } = useContext(UserContext)
    const { setPosts, setMyPosts, setFavorite } = useContext(PostsContext)

    const isAuthor = comment.author._id === currentUser._id ? true : false;
    const created = new Date(comment.created_at);

    function handleDeleteComment(postId, commentId) {
        api.deleteComment(postId, commentId)
            .then((data) => {
                console.log(data)
                setPostComments(data.comments)
                setMyComments(prevState => prevState.filter(oldComment => oldComment._id !== commentId))
                setPosts(prevState => prevState.map(oldPost => postId === oldPost._id ? data : oldPost))
                setFavorite(prevState => prevState.map(oldPost => postId === oldPost._id ? data : oldPost))
                setMyPosts(prevState => prevState.map(oldPost => postId === oldPost._id ? data : oldPost))
            })
            .catch((err) => {
                console.log(err.status)
                err.json()
                    .then(res => console.log(res.message))
            })
        setModalDelete(false)
        setConfirmDelete(() => () => null)
    }



    //функция для открытия модального окна на подтверждение удаления комментарий
    //и передача функции из этого компонента для кнопки "удалить"
    const deleteComment = () => {
        setModalDelete(true)
        setConfirmDelete(() => () => handleDeleteComment(comment.post, comment._id))
      }



  return (
    <div>
        <div className={s.container}>
            <div className={s.inner}>
                <div className={s.author}>
                    <div className={s.avatar} title={`Информация о ${comment?.author?.name}`} onClick={() => {setModalAbout(true); setCommentInfo(comment);}}>
                        <img src={comment?.author?.avatar} alt={comment?.author?.name}></img>
                    </div>
                    <div className={s.info}>
                        <div className={s.name} title="О пользователе" onClick={() => {setModalAbout(true); setCommentInfo(comment);}}>
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
                    {isAuthor && <div className={s.delete} title="Удалить"><DeleteOutlinedIcon onClick={deleteComment/* (e) => handleDeleteComment(e, comment.post, comment._id) */}/></div>}
                </div>
                <Typography variant="body2" color="text.primary" className={s.text}>
                    {comment.text}
                </Typography >
            </div>
        </div>
    </div>
  )
}
