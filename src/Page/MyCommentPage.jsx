import React from "react";
import MyComment from "../components/MyComments/MyComment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";


const MyCommentPage = ({
  myComments,
  setModalDelete,
  setConfirmDelete
}) => {
  
  const navigate = useNavigate()
  
  return (
    <div className="container">
      <div>
        {myComments.length > 0 ? (
          <>
            <h3 className="comments__title">
              <div onClick={() => navigate(-1)}>
                <ArrowBackIcon fontSize="large" className="icon" />
              </div>
              Мои комментарии ({myComments.length}):
            </h3>
            <div className="comments__wrapper">
              {myComments.map((comment, index) => (
                <MyComment
                  comment={comment}
                  key={index + comment.post}
                  setModalDelete={setModalDelete}
                  setConfirmDelete={setConfirmDelete}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="comments__title">
            <div onClick={() => navigate(-1)}>
              <ArrowBackIcon fontSize="large" className="icon" />
            </div>
            Тут пусто. <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCommentPage;
