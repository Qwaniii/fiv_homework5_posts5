import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../utils/Api"
import s from "./mycomment.module.css"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { UserContext } from "../../Context/UserContext";
import { PostsContext } from "../../Context/PostsContext";



const MyComment = ({ comment, setModalDelete, setConfirmDelete }) => {

    const { currentUser, setMyComments, setUserComments } = useContext(UserContext)
    const { setPosts, setMyPosts, setFavorite, setTagsSearch } = useContext(PostsContext)
    const [post, setPost] = useState({})
    const [deleteActive, setDeleteActive] = useState(false)
    const backgroundImage = "https://ih1.redbubble.net/image.343726250.4611/flat,1000x1000,075,f.jpg"
    const postNotFound = "Пост удален"


    useEffect(() => {
        api.getPostById(comment.post)
            .then(data => {
                console.log(data)
                setPost(data)
            })
            .catch(err => err.json().then(res => {
                console.log(res)
            }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    function handleDeleteComment(postId, commentId) {
        api.deleteComment(postId, commentId)
            .then((data) => {
                console.log(data)
                setMyComments(prevState => prevState.filter(comment => comment._id !== commentId))
                setUserComments(prevState => prevState.filter(comment => comment._id !== commentId))
                setPosts(prevState => prevState.map(oldPost => postId === oldPost._id ? data : oldPost))
                setFavorite(prevState => prevState.map(oldPost => postId === oldPost._id ? data : oldPost))
                setMyPosts(prevState => prevState.map(oldPost => postId === oldPost._id ? data : oldPost))
                setTagsSearch(prevState => prevState.map(oldPost => postId === oldPost._id ? data : oldPost))
            })
            .catch((err) => {
                console.log(err.status)
                err.json()
                    .then(res => console.log(res.message))
            })
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
                        <img src={post.image || backgroundImage} alt={post.title} className={s.img}></img>
                    </div>
                    <div className={s.title}>
                        {post.title || postNotFound}
                    </div>
                </div>
            </Link>
            <div className={s.comment} onMouseMove={() => setDeleteActive(true)} onMouseLeave={() => setDeleteActive(false)}>
                <div>Комментарий: </div>
                <div className={s.text}>"{comment.text}"</div>
                {deleteActive && currentUser._id === comment.author._id && <div className={s.delete} title="Удалить комментарий"><DeleteOutlinedIcon onClick={deleteComment/* (e) => handleDeleteComment(e, comment.post, comment._id) */}/></div>}
            </div>
        </div>
    )
}

export default MyComment