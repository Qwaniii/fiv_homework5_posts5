import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import Posts from "../components/Posts/Posts"
import api from "../utils/Api"
import { PostsContext } from "../Context/PostsContext"

export const TagsSearchPage = ({
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
}) => {

    const { setTagsSearch } = useContext(PostsContext)
    const tagName = useParams()
    useEffect(() => {
        setAnchorEl(false)
        handleTagSearch(tagName.tag)
        if (posts.length === 0) {
            api.getPostsList().then((data) => {
                setTagsSearch(data.filter(post => post.tags.length > 0 && post.tags.some(tagArr => tagArr === tagName.tag)))
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagName.tag])


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
                    handleTagSearch={handleTagSearch}
                />
            :
            <div className="container">
          <div className='title'>Постов с таким тегом нет...<br/>Попробуйте другой</div>
            </div>}
        </div>
    )
}