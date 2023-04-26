import React, { useEffect } from 'react'
import Posts from '../components/Posts/Posts'

export default function MainPage({
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
    setModalDelete,
    handleTagSearch
}) {

  
  useEffect(() => {
    setAnchorEl(true)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div>
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
          handleTagSearch={handleTagSearch}
        />
    </div>
  )
}
