import React from "react";
import { useParams } from "react-router-dom";
import PostWindow from "../components/PostWindow/PostWindow";


export default function PostPage({
    onPostLike,
    posts,
    setPosts,
    isLoading,
    setIsLoading,
    anchorComment,
    setAnchorComment,
    modalAbout,
    setModalAbout,
    modalPostUser,
    setModalPostUser,
    setModalDelete,
    setConfirmDelete,
    modalUsersLikes,
    setModalUsersLikes
}) {
    const id = useParams();

    return (
        <div>
            <PostWindow
                id={id.postId}
                onPostLike={onPostLike}
                posts={posts}
                setPosts={setPosts}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                anchorComment={anchorComment}
                setAnchorComment={setAnchorComment}
                modalAbout={modalAbout}
                setModalAbout={setModalAbout}
                modalPostUser={modalPostUser}
                setModalPostUser={setModalPostUser}
                setModalDelete={setModalDelete}
                setConfirmDelete={setConfirmDelete}
                modalUsersLikes={modalUsersLikes}
                setModalUsersLikes={setModalUsersLikes}
            />
        </div>
    );
}
