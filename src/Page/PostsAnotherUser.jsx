import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Posts from '../components/Posts/Posts'
import Spinner from '../components/Spinner/Spinner'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PostsContext } from '../Context/PostsContext';


export default function PostsAnotherUser({
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
  const navigate = useNavigate()
  const { posts, anotherUserPosts, setAnotherUserPosts } = useContext(PostsContext)


  useEffect(() => {
    setAnchorEl(false)
    setAnotherUserPosts(posts.filter((post) => post.author._id === idUser.id))
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [posts])


  if(anotherUserPosts[0]?.author._id) {
    return (
    <div>
      {anotherUserPosts[0]?.author._id === idUser.id 
      ?
      <Posts
        posts={anotherUserPosts}
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
