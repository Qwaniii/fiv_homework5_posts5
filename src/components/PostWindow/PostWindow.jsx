import React, { useContext, useEffect, useState } from "react";
import s from "./postwindow.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tags from "../Tags/Tags";
import api from "../../utils/Api";
import { PostAddRounded } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { IconButton, Typography } from "@mui/material";
import cn from "classnames";
import Spinner from "../Spinner/Spinner";
import NotFoundPage from "../../Page/NotFoundPage";
import Comments from "../Comments/Comments";
import { UserContext } from "../../Context/UserContext";
import DelBtn from "../DelBtn/DelBtn";

export default function PostWindow({
    id,
    posts,
    setPosts,
    isLoading,
    setIsLoading
}) {
    const { currentUser } = useContext(UserContext)

    const [postWindow, setPostWindow] = useState({});
    const [postComments, setPostComments] = useState([]);
    const [errorState, setErrorState] = useState(false);
    const navigate = useNavigate();

    const isAuthor = postWindow?.author?._id === currentUser._id ? true : false;
    const isLike = postWindow?.likes?.some((id) => id === currentUser._id);

    function handleLikeClick() {
        api.changeLikePostStatus(postWindow._id, isLike).then((newPost) => {
            setPostWindow(newPost);
            const newPosts = posts.map((curPost) =>
                curPost._id === newPost._id ? newPost : curPost
            );
            setPosts(newPosts);
        });
    }

    useEffect(() => {
        api.getPostById(id)
            .then((data) => {
                setPostWindow(data)
                setIsLoading(true)
            })
            .catch( err => setErrorState(true))
        api.getPostComments(id)
            .then((data) => {
                setPostComments(data)
            })
    }, [id]);



    const date = new Date(postWindow.created_at);


    return (
        <>
         {isLoading ? 
           !errorState && (<div className={s.postwindow}>
                <div className={s.container}>
                    <div className={s.wrapper}>
                        <div className={s.header}>
                            <div className={s.inner}>
                                <Link onClick={() => navigate(-1)}>
                                    <ArrowBackIcon
                                        fontSize="large"
                                        className={s.icon}
                                    />
                                </Link>
                                <span className={s.headerRight}>
                                    <Avatar aria-label="recipe">
                                        <img
                                            src={postWindow?.author?.avatar}
                                            className={s.avatar}
                                        ></img>
                                    </Avatar>
                                    <div className={s.authorInfo}>
                                        <p>{postWindow?.author?.name}</p>
                                        <p>
                                            {date.toLocaleDateString("ru-RU", {
                                                month: "long",
                                                day: "numeric",
                                            })}{" "}
                                            {date.getFullYear()}
                                        </p>
                                    </div>
                                    {isAuthor && <div className={s.delBtn}><DelBtn/></div>}
                                </span>
                            </div>
                        </div>
                        <div className={s.main}>
                            <div className={s.img}>
                                <img src={postWindow.image} alt="Image"></img>
                            </div>
                            <div className={s.right}>
                            <Typography variant="h5" color="text.secondary">{postWindow.title}</Typography>
                            <Typography variant="body2" color="text.primary">{postWindow.text}</Typography>
                                <div className={s.bottom}>
                                    <div className={s.like}>
                                        <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                                            <FavoriteIcon
                                                className={cn({
                                                    [s.favorite]: isLike,
                                                })}
                                            />
                                            {postWindow?.likes?.length > 0 ? (
                                                <span className={s.numLike}>
                                                    {postWindow.likes.length}
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </IconButton>
                                    </div>
                                    <div className={s.tag}>
                                        {postWindow.tags &&
                                            postWindow?.tags?.map((tag, index) => (
                                                tag.length < 15 && <Tags tag={tag} key={index} />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.footerWrap}>
                        <div></div>
                        <div className={s.footer}>
                        {postComments
                            .map((comment, index) => <Comments comment={comment} key={comment._id} />)}
                            {/* <Comments comment={postComments[0]}/> */}
                            {/* {postComments.map((comment) => {
                                <Comments 
                                    comment={comment} 
                                    key={comment._id}/>
                            }) } */}
                        </div>
                    </div>
                </div>
            </div>)
            : <Spinner/>}  
            {errorState && <NotFoundPage/>}    
        </>                                 
    );
}
