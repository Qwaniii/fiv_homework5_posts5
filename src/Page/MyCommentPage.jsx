import React from "react";
import MyComment from "../components/MyComments/MyComment";

const MyCommentPage = ({
  postFromCommets,
  myComments,
  setMyComments,
  anchorAddDelEditComment,
  setAnchorAddDelEditComment,
  setModalDelete,
  setConfirmDelete
}) => {
  return (
    <div className="container">
      <div>
        {myComments.length > 0 ? (
          <>
            <h3 className="comments__title">
              Мои комментарии ({myComments.length}):
            </h3>
            <div className="comments__wrapper">
              {myComments.map((comment, index) => (
                <MyComment
                  comment={comment}
                  key={index + comment.post}
                  anchor={anchorAddDelEditComment}
                  setAnchor={setAnchorAddDelEditComment}
                  setModalDelete={setModalDelete}
                  setConfirmDelete={setConfirmDelete}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="comments__title">
            Тут пусто. <br />
            Добавьте комментарии...
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCommentPage;
