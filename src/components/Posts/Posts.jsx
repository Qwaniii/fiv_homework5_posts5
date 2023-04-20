import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPageAction, viewPostsAction } from "../../storage/reducers/paginateReducers";
import Post from "../Post/Post";
import SearchAddPost from "../SearchAddPost/SearchAddPost";
import Sort from "../Sort/Sort";
import Spinner from "../Spinner/Spinner";
import Paginate from "../Paginate/Paginate"
import s from "./posts.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import UpperNotific from "../UpperNotific/UpperNotific";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


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
  const location = useLocation()
  const navigate = useNavigate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const urlOutPaginate = ['/my-posts', '/favorite']

  const amountPosts = (amount) => {
    dispatch(viewPostsAction(amount))
    dispatch(nextPageAction(1))
  }

  const amountPage = [12, 24, 30]

  const allPage = new Array(maxPage).fill(null).map((page, index) => page = index + 1)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let  list = [];

  //сортировка постов
  if (selectedTab === "stock") {
    list = posts.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
  } else if (selectedTab === "new") {
    list = posts.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (selectedTab === "popular") {
    list = posts.sort((a, b) => b?.likes?.length - a.likes?.length)
  }

  const startPaginate = (viewPosts * page) - viewPosts
  
  useEffect(() => {
    if (!urlOutPaginate.some(path => location.pathname.includes(path))) {
      setPostsForPaginate(list.slice(startPaginate, startPaginate + viewPosts))
    } else {
      setPostsForPaginate(list)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewPosts, list, selectedTab, page, startPaginate, dispatch, location.pathname])  

  useEffect(() => {
    if(searchQuery) {
      setActiveSearch(true)
    }
  }, [searchQuery])

  const word = (length, w) => {
    if (length % 10 === 1) {
      return w
    } else if (length % 10 > 1 && posts.length % 10 < 5) {
      return w + "а"
    } else if (length % 10 >= 5 || !posts.length) {
      return w + "ов"
    }
  }

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
          <div onClick={() => navigate(-1)}>
            <ArrowBackIcon fontSize="large" className={s.icon} />
          </div>
          }
          <Sort selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>

          {/* <LoginPage/> */}
          {searchQuery && <div className={s.notification}>
            <UpperNotific message={`Найдено ${posts.length} ${word(posts.length, "пост")}`} visible={activeSearch} setVisible={setActiveSearch}/>
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
          {maxPage > 1  && !urlOutPaginate.some(path => location.pathname.includes(path)) &&
          <div>
            <div className={s.paginate}>
            {maxPage < 6 && 
              allPage.map((num, index) => (
                  <Paginate key={index + num}  page={num} />
              )) 
            }


            {maxPage > 5 && page > 3 && 
                <>
                    <Paginate
                      page={1}
                    />
                    <span className={s.dot}>...</span>
               </>
            }  

            { maxPage > 5 && page < 3 &&
              allPage
                  .slice(0, 3)
                  .map((num, index) => (
                    <Paginate
                      key={index + num}  page={num} 
                    />
                  ))
            }
            {maxPage > 5 && page === 3 &&
              allPage
                  .slice(0, page + 1)
                  .map((num, index) => (
                    <Paginate
                    key={index + num}  page={num} 
                    />
                  ))
            }
            {maxPage > 5 && page > 3 && page < allPage.length - 2 &&
              allPage
                  .slice(page - 2, page + 1)
                  .map((num, index) => (
                    <Paginate
                      key={index + num}  page={num} 
                    />
                  ))
            }
            {maxPage > 5 && page > 3 && page > allPage.length - 3 &&
              allPage
                  .slice(page - 2, allPage.length + 2)
                  .map((num, index) => (
                    <Paginate
                    key={index + num}  page={num} 
                    />
                  ))
            } 
            {maxPage > 5 && page < allPage.length - 2 && (
                <>
                  <span className={s.dot}>...</span>
                  <Paginate
                    page={allPage.length}
                  />
                </>
              )
            }
            
            </div>
            <div className={s.amount}>
              <div>Количество постов на странице: </div>
              <select value={viewPosts} onChange={(e) => amountPosts(Number(e.target.value))}>
                {amountPage.map((postPage, index) => (
                  <option key={page + index}>{postPage}</option>
                ))}
              </select>
            </div>
          </div>}
        </div>
      </div>
    </main>
  );
}
