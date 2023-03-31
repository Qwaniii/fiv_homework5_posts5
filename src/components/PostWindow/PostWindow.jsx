import React, { useContext, useEffect, useState } from "react";
import s from "./postwindow.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tags from "../Tags/Tags";
import api from "../../utils/Api";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Button, IconButton, Typography } from "@mui/material";
import cn from "classnames";
import Spinner from "../Spinner/Spinner";
import NotFoundPage from "../../Page/NotFoundPage";
import Comments from "../Comments/Comments";
import { UserContext } from "../../Context/UserContext";
import DelBtn from "../DelBtn/DelBtn";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import SecondPopup from "../PopupSecond/SecondPopup";
import AboutAnotherUser from "../AboutAnotherUser/AboutAnotherUser";
import Notification from "../Notification/Notification";

export default function PostWindow({
  id,
  posts,
  setPosts,
  anchorLike,
  setAnchorLike,
  isLoading,
  setIsLoading,
  anchorAddDelEditComment,
  setAnchorAddDelEditComment,
  modalAbout,
  setModalAbout,
  anchorEditUser,
  modalPostUser,
  setModalPostUser,
  setModalDelete,
  setConfirmDelete
}) {
  const { currentUser } = useContext(UserContext);

  const [postWindow, setPostWindow] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [textComment, setTextComment] = useState({ text: "" });
  const [editPost, setEditPost] = useState(false);
  const [readyEditPost, setReadyEditPost] = useState({});
  const [commentInfo, setCommentInfo] = useState({});
  const [successMessage, setSuccessMessage] = useState("")
  const [notificMessage, setNotificMessage] = useState("")
  const navigate = useNavigate();

  const backgroundImage =
    "https://www.sundayairlines.kz/local/frontend/dist/img/no_pic.24654b31.jpg";

  const isAuthor = postWindow?.author?._id === currentUser._id ? true : false;
  const isLike = postWindow?.likes?.some((id) => id === currentUser._id);

  useEffect(() => {
    setIsLoading(false);
    api
      .getPostById(id)
      .then((data) => {
        setPostWindow(data);
        setReadyEditPost({
          title: data.title,
          text: data.text,
          image: data.image,
          tags: data.tags,
        });
        setIsLoading(true);
        
      })
      .catch((err) => setErrorState(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, anchorEditUser]);

  useEffect(() => {
    api
          .getPostComments(id)
          .then((data) => {
            setPostComments(data);
          })
          .catch((err) => console.log(err));
  }, [anchorAddDelEditComment, id])

  function handleEditPost(id, data) {
    api
      .editPostById(id, data)
      .then((data) => {
        setPostWindow(data);
        console.log(data);
        setSuccessMessage("Изменения сохранены")
        setEditPost(false);
        setAnchorAddDelEditComment(!anchorAddDelEditComment);
        setTimeout(() => {
          setSuccessMessage("")
        }, 3000)
      })
      .catch((err) => console.log(err));

  }

  function handleLikeClick() {
    api.changeLikePostStatus(postWindow._id, isLike).then((newPost) => {
      setPostWindow(newPost);
      const newPosts = posts.map((curPost) =>
        curPost._id === newPost._id ? newPost : curPost
      );
      setPosts(newPosts);
      setAnchorLike(!anchorLike)
    });
  }

  function handleAddComment(e, text) {
    // e.preventDefault();
    api
      .addNewComment(id, text)
      .then((data) => {
        console.log(data);
        setAnchorAddDelEditComment(!anchorAddDelEditComment);
        setTextComment({ text: "" });
        setSuccessMessage("Комментарий добавлен")
        setTimeout(() => {
          setSuccessMessage("")
        }, 4000)
      })
      .catch((err) => console.log(err));
  }

  function handleDelPost(id) {
      api
        .deletePost(id)
        .then((delitingPost) => {
          const newPosts = posts.filter(
            (curPost) => curPost._id !== delitingPost._id
          );
          setPosts(newPosts);
          setAnchorLike(!anchorLike)
          setModalDelete(false)
          setConfirmDelete(() => () => null)
          navigate("/fo_homework4_post4");
        })
        .catch((err) => console.log(err));
    }

  const deletePost = () => {
    setModalDelete(true)
    setConfirmDelete(() => () => handleDelPost(id))
  }

  const emptyText = () => {
    setNotificMessage("Введите комментарий")
    setTimeout(() => {
      setNotificMessage("")
    }, 4000)
  }

  console.log(postWindow)

  const date = new Date(postWindow.created_at);
  const update = new Date(postWindow.updated_at);

  return (
    <>
      {isLoading ? (
        !errorState && (
          <div className={s.postwindow}>
            <div className={s.container}>
              <div className={s.wrapper}>
                <div className={s.header}>
                  <div className={s.inner}>
                    <Link onClick={() => navigate(-1)}>
                      <ArrowBackIcon fontSize="large" className={s.icon} />
                    </Link>
                    <span className={s.headerRight}>
                      <Avatar aria-label="recipe">
                        <img
                          onClick={() => setModalPostUser(true)}
                          src={postWindow?.author?.avatar}
                          className={s.avatar}
                          alt={postWindow?.author?.name}
                          title="О пользователе"
                        ></img>
                      </Avatar>
                      <div>
                        <p onClick={() => setModalPostUser(true)} 
                            title="О пользователе"
                            className={s.authorInfo}>{postWindow?.author?.name}</p>
                        <p>
                          {date.toLocaleDateString("ru-RU", {
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          {date.getFullYear()}
                        </p>
                      </div>
                      <SecondPopup popup={modalPostUser} setPopup={setModalPostUser}>
                        <span><AboutAnotherUser
                          commentInfo={postWindow} setPopup={setModalPostUser} 
                        /></span>
                       </SecondPopup>
                      {isAuthor &&
                        (editPost ? (
                          <div className={s.btn}>
                            <span
                              className={`${s.edit} ${s.save}`}
                              onClick={() => handleEditPost(id, readyEditPost)}
                              title="Сохранить"
                            >
                              <SaveOutlinedIcon />
                            </span>
                            <span
                              className={s.delete}
                              onClick={() => setEditPost(false)}
                              title="Отмена"
                            >
                              <DoDisturbAltOutlinedIcon />
                            </span>
                          </div>
                        ) : (
                          <div className={s.btn}>
                            <span
                              className={s.edit}
                              onClick={() => setEditPost(true)}
                              title="Редактировать"
                            >
                              <CreateOutlinedIcon />
                            </span>
                            <span
                              className={s.delete}
                              onClick={deletePost}
                              title="Удалить"
                            >
                              <DelBtn />
                            </span>
                          </div>
                        ))}
                    </span>
                  </div>
                </div>
                <div className={s.main}>
                  <div className={s.img}>
                    <img
                      src={
                        editPost
                          ? readyEditPost.image || backgroundImage
                          : postWindow.image
                      }
                      alt={postWindow.title}
                    ></img>
                  </div>
                  <div className={s.right}>
                    <div className={s.updatePost}>
                      {date.getTime() !== update.getTime() ? (
                        <div className={s.date}>
                          Изменено:{" "}
                          {update.toLocaleDateString("ru-RU", {
                            month: "2-digit",
                            day: "numeric",
                            year: "numeric",
                          })}
                          <span className={s.time}>
                            {update.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      className={s.title}
                    >
                      {editPost ? (
                        <input
                          className={s.input}
                          type="text"
                          placeholder="Заголовок поста"
                          value={readyEditPost.title}
                          onChange={(e) => {
                            setReadyEditPost((prevState) => ({
                              ...prevState,
                              title: e.target.value.toString(),
                            }));
                          }}
                        ></input>
                      ) : (
                        postWindow.title
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {editPost ? (
                        <textarea
                          className={s.textarea}
                          type="text"
                          placeholder="Текст"
                          value={readyEditPost.text}
                          onChange={(e) => {
                            setReadyEditPost((prevState) => ({
                              ...prevState,
                              text: e.target.value.toString(),
                            }));
                          }}
                        ></textarea>
                      ) : (
                        postWindow.text
                      )}
                    </Typography>
                    {editPost && (
                      <>
                        <label htmlFor="inpImg">Изображение:</label>
                        <input
                          id="inpImg"
                          className={`${s.input} ${s.inpImg}`}
                          type="text"
                          placeholder="Ссылка на изображение"
                          value={readyEditPost.image}
                          onChange={(e) => {
                            setReadyEditPost((prevState) => ({
                              ...prevState,
                              image: e.target.value.toString(),
                            }));
                          }}
                        ></input>
                      </>
                    )}
                    <div className={s.bottom}>
                      <div className={s.like}>
                        <IconButton
                          aria-label="add to favorites"
                          onClick={handleLikeClick}
                        >
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
                        {editPost ? (
                          <input
                            className={`${s.input} ${s.inpTag}`}
                            type="text"
                            placeholder="Введите тэги, через запятую"
                            value={readyEditPost.tags}
                            onChange={(e) => {
                              setReadyEditPost((prevState) => ({
                                ...prevState,
                                tags: e.target.value
                                  .replace(/\s/g, "")
                                  .split(","),
                              }));
                            }}
                          ></input>
                        ) : (
                          postWindow.tags &&
                          postWindow?.tags?.map(
                            (tag, index) =>
                              tag.length && <Tags tag={tag} key={index} />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.footerWrap}>
                <div></div>
                <div className={s.footer}>
                  {postComments.map((comment, index) => (                
                      <Comments
                        comment={comment}
                        key={comment._id}
                        setAnchor={setAnchorAddDelEditComment}
                        anchor={anchorAddDelEditComment}
                        modalAbout={modalAbout}
                        setModalAbout={setModalAbout}
                        setCommentInfo={setCommentInfo}
                        setModalDelete={setModalDelete}
                        setConfirmDelete={setConfirmDelete}
                      />
                  ))}
                  {/* <Comments comment={postComments[0]}/> */}
                  {/* {postComments.map((comment) => {
                                <Comments 
                                    comment={comment} 
                                    key={comment._id}/>
                            }) } */}
                </div>
              </div>
                <SecondPopup popup={modalAbout} setPopup={setModalAbout}>
                   <span><AboutAnotherUser
                          commentInfo={commentInfo} setPopup={setModalAbout} 
                    /></span>
                </SecondPopup>
              <div className={s.footerWrap}>
                <div></div>
                <div className={s.newComment}>
                  <form
                    className={s.form}
                    onSubmit={(e) => handleAddComment(e, textComment)}
                  >
                    <textarea
                      type="text"
                      placeholder="Напишите комментарий"
                      value={textComment.text}
                      onChange={(e) => {
                        setTextComment((prevState) => ({
                          ...prevState,
                          text: e.target.value.toString(),
                        }));
                      }}
                    ></textarea>
                    <Button
                      size="small"
                      className={s.commentBtn}
                      onClick={
                        textComment.text.length > 0
                          ? (e) => handleAddComment(e, textComment)
                          : () => emptyText()
                      }
                    >
                      добавить
                    </Button>
                  </form>
            
                </div>
              </div>
            </div>
            {successMessage && <div className={s.notification}><Notification title="Отлично" text={successMessage}/></div>}
            {notificMessage && <div className={s.notification}><Notification title="Ошибка" text={notificMessage} color={true}/></div>}
          </div>
        )
      ) : (
        <Spinner />
      )}
      {errorState && <NotFoundPage/>}
    </>
  );
}
