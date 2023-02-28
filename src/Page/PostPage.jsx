import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostWindow from "../components/PostWindow/PostWindow";


export default function PostPage({
    onPostLike,
    posts,
    setPosts,
    isLoading,
    setIsLoading
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
            />
        </div>
    );
}
