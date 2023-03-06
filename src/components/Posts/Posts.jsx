import React, { useState } from "react";
import LoginPage from "../../Page/LoginPage";
import Post from "../Post/Post";
import SearchAddPost from "../SearchAddPost/SearchAddPost";
import Sort from "../Sort/Sort";
import Spinner from "../Spinner/Spinner";
import s from "./posts.module.css";

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

}) {

  

  let  list = [];

  if (selectedTab === "stock") {
    list = posts.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
  } else if (selectedTab === "new") {
    list = posts.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (selectedTab === "popular") {
    list = posts.sort((a, b) => b?.likes?.length - a.likes?.length)
  }

  return (
    <main>
      <div className={s.posts}>
        <div className={s.container}>
          <SearchAddPost
            active={active}
            setActive={setActive}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            setPopupEdit={setPopupEdit}
          />

          <Sort selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>

          {/* <LoginPage/> */}
          
          <div className={s.inner}>
            {isLoading ? 
                list
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
                  />))
                :
                <Spinner/>}
          </div>
        </div>
      </div>
    </main>
  );
}
