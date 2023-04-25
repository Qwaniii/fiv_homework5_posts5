import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Posts from '../components/Posts/Posts'
import api from '../utils/Api'
import { PostsContext } from '../Context/PostsContext'
import Spinner from '../components/Spinner/Spinner'

export default function PostsAnotherUser({
  posts,
  onPostLike,
  active,
  setActive,
  postDelete,
  anchorEl,
  setAnchorEl,
  setSearchQuery,
  searchQuery,
  isLoading,
  setIsLoading,
  selectedTab,
  setSelectedTab,
  setPopupEdit,
  setConfirmDelete,
  setModalDelete
}) {

  const idUser = useParams()
  const { setAnotherUserPosts } = useContext(PostsContext)
  const navigate = useNavigate()

  useEffect(() => {
    setAnchorEl(false)
    api.getPostsList()
        .then(data => {
            setAnotherUserPosts(
                data.filter((post) => post.author._id === idUser.id)
            )
        })
        .catch(err => console.log(err.status))
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


  if(posts[0]?.author._id) {
    return (
    <div>
      {posts[0]?.author._id === idUser.id 
      ?
      <Posts
        posts={posts}
        onPostLike={onPostLike}
        active={active}
        setActive={setActive}
        postDelete={postDelete}
        anchorEl={anchorEl}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
        setPopupEdit={setPopupEdit}
        setConfirmDelete={setConfirmDelete}
        setModalDelete={setModalDelete}
        />
        :
        <Spinner/>}
    </div>
  )
} else {
  return (
    <div className="container">
      <div className='title'>У данного пользователя нет постов...<br/>
        <span style={{color: "gray", cursor: "pointer"}} onClick={() => navigate(-1)}>Назад</span>
      </div>

    </div>
  )
}
}
