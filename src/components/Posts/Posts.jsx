import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPageAction, viewPostsAction } from "../../storage/reducers/paginateReducers";
import Post from "../Post/Post";
import SearchAddPost from "../SearchAddPost/SearchAddPost";
import Sort from "../Sort/Sort";
import Spinner from "../Spinner/Spinner";
import Paginate from "../Paginate/Paginate"
import s from "./posts.module.css";
import Notification from "../Notification/Notification";

export default function Posts({
  posts,
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
  setSelectedTab,
  selectedTab,
  setPopupEdit,
  setConfirmDelete,
  setModalDelete
}) {

  const [postsForPaginate, setPostsForPaginate] = useState([])
  const [activeSearch, setActiveSearch] = useState(false)
  const maxPage = useSelector(state => state.paginate.maxPage)
  const viewPosts = useSelector(state => state.paginate.viewPosts)
  const page = useSelector(state => state.paginate.page)
  const dispatch = useDispatch()

  const amountPosts = (amount) => {
    dispatch(viewPostsAction(amount))
    dispatch(nextPageAction(1))
  }

  const amountPage = [12, 24, 30]


  const allPage = new Array(maxPage).fill(null).map((page, index) => page = index + 1)

  let  list = [];

  if (selectedTab === "stock") {
    list = posts.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
  } else if (selectedTab === "new") {
    list = posts.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (selectedTab === "popular") {
    list = posts.sort((a, b) => b?.likes?.length - a.likes?.length)
  }

  const startPaginate = (viewPosts * page) - viewPosts
  useEffect(() => {
    setPostsForPaginate(list.slice(startPaginate, startPaginate + viewPosts))
  }, [viewPosts, list, selectedTab, page, startPaginate])  

  useEffect(() => {
    if(searchQuery) {
      setActiveSearch(true)
      let timeout = setTimeout(() => {
        setActiveSearch(false)
      }, 5000)
        return () => clearTimeout(timeout)
    }
  }, [searchQuery])

  return (
    <main>
      <div className={s.posts}>
        <div className={s.container}>
          {anchorEl ?
          <SearchAddPost
            active={active}
            setActive={setActive}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            setPopupEdit={setPopupEdit}
          />
          :
          null
          }
          <Sort selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>

          {/* <LoginPage/> */}
          {searchQuery && activeSearch && <div className={s.notification}>
            <Notification title="Найдено" text={`${posts.length} постов`}/>
          </div>}
          
          <div className={s.inner}>
            {isLoading ? 
                postsForPaginate
                .map((item, index) => (
                  <Post
                    key={item._id}
                    post={item}
                    onPostLike={onPostLike}
                    postDelete={postDelete}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    handleClick={handleClick}
                    setIsLoading={setIsLoading}
                    setConfirmDelete={setConfirmDelete}
                    setModalDelete={setModalDelete}
                  />))
                :
                <Spinner/>}
          </div>
          {maxPage && !searchQuery && <div>
            <div className={s.paginate}>
              {allPage.map((num, index) => (
                  <Paginate key={index + num}  page={num} />
              )) }
            </div>
            <div className={s.amount}>
              <select onChange={(e) => amountPosts(Number(e.target.value))}>
                {amountPage.map((page, index) => (
                  <option key={page + index} >{page}</option>
                ))}
              </select>
            </div>
          </div>}
        </div>
      </div>
    </main>
  );
}
