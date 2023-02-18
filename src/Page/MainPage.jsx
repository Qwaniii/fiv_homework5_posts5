import React from 'react'
import Posts from '../components/Posts/Posts'

export default function MainPage({
    posts,
    currentUser,
    onPostLike,
    active,
    setActive,
    postDelete,
    anchorEl,
    handleClick,
    handleClose,
    setSearchQuery,
    searchQuery
}) {
  return (
    <div>
        <Posts
        posts={posts}
        currentUser={currentUser}
        onPostLike={onPostLike}
        active={active}
        setActive={setActive}
        postDelete={postDelete}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        />
    </div>
  )
}
