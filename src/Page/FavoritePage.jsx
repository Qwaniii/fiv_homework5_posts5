import React, { useEffect } from 'react'
import Posts from '../components/Posts/Posts'

export default function FavoritePage({
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
  useEffect(() => {
    setAnchorEl(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {posts.length > 0 ? 
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
        <div className="container">
          <div className='title'>Любимых постов нет...<br/>Поставьте лайк, и пост появится тут</div>
        </div>
      }
    </div>
  )
}
