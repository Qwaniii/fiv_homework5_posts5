import React from 'react'
import { useParams } from 'react-router-dom'
import PostWindow from '../components/PostWindow/PostWindow'

export default function PostPage({ currentUser, onPostLike, posts, setPosts }) {

    const id = useParams()
    


  return (
    <div>
        <PostWindow id={id.postId} currentUser={currentUser} onPostLike={onPostLike} posts={posts} setPosts={setPosts}/>
    </div>
  )
}
