import { Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Edituser from "./components/EditUser/Edituser";
import Header from "./components/Header/Header";
import Popup from "./components/Popup/Popup";
import Posts from "./components/Posts/Posts";
import PostWindow from "./components/PostWindow/PostWindow";
import { UserContext } from "./Context/UserContext";
import useDebounce from "./hooks/useDebounse";
import Newpost from "./NewPost/Newpost";
import MainPage from "./Page/MainPage";
import NotFoundPage from "./Page/NotFoundPage";
import PostPage from "./Page/PostPage";
import api from "./utils/Api";

function App() {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [searchActive, setSearchActive] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [modalActive, setModalActive] = useState(false);
    const [modalUserActive, setModalUserActive] = useState(false);
    const [postWindow, setPostWindow] = useState({});
    const [scrollTop, setScrollTop] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState("stock");


    const debounceValue = useDebounce(searchQuery, 500);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        api.getAppInfo().then(([postsData, currentUserData]) => {
            setPosts(postsData);
            setCurrentUser(currentUserData);
            console.log("render cards & user")
            setIsLoading(true);
        });
    }, []);

    useEffect(() => {
        api.search(debounceValue).then((data) => {
            setPosts(data);
        });
    }, [debounceValue]);

    useEffect(() => {
        const handleScroll = event => {
          setScrollTop(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    function handlePostLike(post) {
        const isLiked = post.likes.some((el) => el === currentUser._id);
        isLiked
            ? api.deleteLikePost(post._id).then((newPost) => {
                  const newPosts = posts.map((curPost) =>
                      curPost._id === newPost._id ? newPost : curPost
                  );
                  setPosts([...newPosts]);
              })
            : api.getLikePost(post._id).then((newPost) => {
                  const newPosts = posts.map((curPost) =>
                      curPost._id === newPost._id ? newPost : curPost
                  );
                  setPosts([...newPosts]);
              });
    }

    function handlePostDelete(post) {
        // const isAuthor = post.author._id === currentUser._id ? true : false;
        // isAuthor
        //     ? 

        api.deletePost(post._id).then((delitingPost) => {
                const newPosts = posts.filter(
                    (curPost) => curPost._id !== delitingPost._id
                );
                setPosts(newPosts);
            })

            // : alert("Вы не можете удалить чужой пост");
        // handleClose();
    }

    return (
        <div className="App">
            <UserContext.Provider value={{currentUser, setCurrentUser}} >
                <Header
                    popupEdit={modalUserActive}
                    setPopupEdit={setModalUserActive}
                    scrollTop={scrollTop}
                />
                <Routes>
                    <Route
                        // index
                        path="fo_homework4_post4/"
                        element={
                            <MainPage
                                posts={posts}
                                onPostLike={handlePostLike}
                                active={searchActive}
                                setActive={setSearchActive}
                                postDelete={handlePostDelete}
                                anchorEl={anchorEl}
                                handleClick={handleClick}
                                handleClose={handleClose}
                                setSearchQuery={setSearchQuery}
                                searchQuery={searchQuery}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                setSelectedTab={setSelectedTab}
                                selectedTab={selectedTab}
                                setPopupEdit={setModalActive}
                            />
                        }
                    ></Route>
                    <Route
                        path="fo_homework4_post4/post/:postId"
                        element={
                            <PostPage
                                onPostLike={handlePostLike}
                                posts={posts}
                                setPosts={setPosts}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                            />
                        }
                    ></Route>
                    <Route path="*"
                        element={<NotFoundPage/>}>
                    </Route>
                </Routes>
                <Popup popup={modalActive} setPopup={setModalActive}>
                        {modalActive && <Newpost setPopup={setModalActive} setPosts={setPosts}/>}
                </Popup>
                <Popup popup={modalUserActive} setPopup={setModalUserActive}>
                        {modalUserActive && <Edituser setPopup={setModalUserActive}/>}
                </Popup>
            </UserContext.Provider>
        </div>
    );
}

export default App;
