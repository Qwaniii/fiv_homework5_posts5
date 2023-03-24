import React from 'react'
import Posts from '../components/Posts/Posts'

export default function MyPostPage({
  posts,
  setPosts,
  onPostLike,
  active,
  setActive,
  postDelete,
  anchorEl,
  handleClick,
  handleClose,
  setSearchQuery,
  searchQuery,
  isLoading,
  setIsLoading,
  selectedTab,
  setSelectedTab,
  setPopupEdit,
}) {
  const handleLikeAllPosts = (post) => {
    onPostLike(post, posts, setPosts)
  }
  return (
    <div>
      <Posts
        posts={posts}
        onPostLike={handleLikeAllPosts}
        active={active}
        setActive={setActive}
        postDelete={postDelete}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
        setPopupEdit={setPopupEdit}
        />
    </div>
  )
}
