import React, { useEffect } from 'react'
import Posts from '../components/Posts/Posts'

export default function MyPostPage({
  posts,
  setPosts,
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

  useEffect(() => {
    setAnchorEl(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLikeAllPosts = (post) => {
    onPostLike(post, posts, setPosts)
  }
  return (
    <div>
      {posts.length > 0 ?
      <Posts
        posts={posts}
        onPostLike={handleLikeAllPosts}
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
        <div className="container">
          <div className='title'>Ваших постов нет...<br/>Добавьте пост</div>
        </div>
      }
    </div>
  )
}
