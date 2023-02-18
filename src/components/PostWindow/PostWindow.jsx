import React, { useEffect, useState } from "react";
import s from "./postwindow.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tags from "../Tags/Tags";
import api from "../../utils/Api";
import { PostAddRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import cn from "classnames"

export default function PostWindow({ id, currentUser, onPostLike, posts, setPosts }) {

    const [postWindow, setPostWindow] = useState({});
    const isLike = postWindow?.likes?.some((id) => id === currentUser._id);
    function handleLikeClick() {
        onPostLike(postWindow);
        console.log(posts)
      }

    useEffect(() => {
        api.getPostById(id).then((data) => setPostWindow(data));
    }, [id]);

    const date = new Date(postWindow.created_at)
    console.log(postWindow)

    return (
        <div className={s.postwindow}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <div className={s.header}>
                        <div className={s.inner}>
                            <Link to="/">
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
                                        {date.toLocaleDateString('ru-RU', {month: "long", day: "numeric"})} {date.getFullYear()}
                                    </p>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className={s.main}>
                        <div className={s.img}>
                            <img src={postWindow.image} alt="Image"></img>
                        </div>
                        <div className={s.right}>
                            <h3>{postWindow.title}</h3>
                            <p>{postWindow.text}</p>
                            <div className={s.bottom}>
                                <div className={s.like}>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon
                                        onClick={handleLikeClick}
                                        className={cn({ [s.favorite]: isLike })}
                                        />
                                        {postWindow?.likes?.length > 0 ? <span className={s.numLike}>{postWindow.likes.length}</span> : ""}
                                    </IconButton>
                                </div>
                                <div className={s.tag}>{postWindow?.tags?.map((tag, index) => <Tags tag={tag} key={index}/>)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.footer}>Comments?</div>
            </div>
        </div>
    );
}
