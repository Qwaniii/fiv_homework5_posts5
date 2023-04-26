import React, { useContext, useEffect } from "react";
import MyComment from "../components/MyComments/MyComment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { UserContext } from "../Context/UserContext";


export default function UserCommentsPage({
  setModalDelete,
  setConfirmDelete
}) {
    const idUser = useParams()
    const { userComments, setUserComments, allComments } = useContext(UserContext)

    useEffect(() => {
      setUserComments(allComments.filter((post) => post.author._id === idUser.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allComments])
  
  const navigate = useNavigate()

  if (userComments.length > 0) {
  return (
    <div className="container">
    {userComments[0]?.author._id === idUser.id
    ?
    <>
      <h3 className="comments__title">
        <div onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="large" className="icon" />
        </div>
        Комментарии {userComments[0].author.name} ({userComments.length}):
      </h3>
      <div className="comments__wrapper">
        {userComments.map((comment, index) => (
          <MyComment
            comment={comment}
            key={index + comment.post}
            setModalDelete={setModalDelete}
            setConfirmDelete={setConfirmDelete}
          />))}
    </div>
      </>
      :
      <Spinner/>}
    </div>

  )} else {
  return (
    <div className="container">
      <div className="comments__title">
        <div onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="large" className="icon" />
        </div>
        Тут пусто. <br />
      </div>
    </div>
    )
  }
}
