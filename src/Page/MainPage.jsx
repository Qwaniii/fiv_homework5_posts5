import React from 'react'
import Posts from '../components/Posts/Posts'
import Spinner from '../components/Spinner/Spinner'

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
    searchQuery,
    isLoading,
    setIsLoading
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
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        />
    </div>
  )
}
