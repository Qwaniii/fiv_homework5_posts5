import React from "react";
import { useParams } from "react-router-dom";
import PostWindow from "../components/PostWindow/PostWindow";


export default function PostPage({
    onPostLike,
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
    setModalPostUser
}) {
    const id = useParams();

    return (
        <div>
            <PostWindow
                id={id.postId}
                onPostLike={onPostLike}
                posts={posts}
                setPosts={setPosts}
                anchorLike={anchorLike}
                setAnchorLike={setAnchorLike}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                anchorAddDelEditComment={anchorAddDelEditComment}
                setAnchorAddDelEditComment={setAnchorAddDelEditComment}
                anchorEditUser={anchorEditUser}
                modalAbout={modalAbout}
                setModalAbout={setModalAbout}
                modalPostUser={modalPostUser}
                setModalPostUser={setModalPostUser}
            />
        </div>
    );
}
