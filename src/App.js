import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Edituser from "./components/EditUser/Edituser";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Registration from "./components/Login/Registration";
import Popup from "./components/Popup/Popup";
import SecondPopup from "./components/PopupSecond/SecondPopup";
import { UserContext } from "./Context/UserContext";
import useDebounce from "./hooks/useDebounse";
import Newpost from "./NewPost/Newpost";
import GuestPage from "./Page/GuestPage";
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
    const [modalInfoAboutUser, setModalInfoAboutUser] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);
    const [modalRegistr, setModalRegistr] = useState(false);
    const [modalPostUser, setModalPostUser] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState("stock");
    const [anchorEditUser, setAnchorEditUser] = useState(false);
    const [anchorNewPost, setAnchorNewPost] = useState(false);
    const [anchorAddDelEditComment, setAnchorAddDelEditComment] = useState(false);
    const [isAuth, setIsAuth] = useState(false)

    const token = sessionStorage.getItem("token")

    

    const debounceValue = useDebounce(searchQuery, 500);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if(isAuth) {        
            api.getAppInfo().then(([postsData, currentUserData]) => {
            setPosts(postsData);
            setCurrentUser(currentUserData);
            // setNumberComments(postsData.map((item) => item.comments.length))
            console.log("render cards & user")
            setIsLoading(true);
        });
        }
    }, [anchorEditUser, anchorNewPost, anchorAddDelEditComment, isAuth]);

    useEffect(() => {
       if(isAuth) { 
        api.search(debounceValue).then((data) => {
            setPosts(data);
        });
        }
    }, [debounceValue, isAuth]);

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

    useEffect(() => {
        if (token) setIsAuth(true)
    }, [token])

    function handlePostDelete(post) {
        // const isAuthor = post.author._id === currentUser._id ? true : false;
        // isAuthor
        //     ? 
        const deletePost = window.confirm("Удалить пост?")
        
        if(deletePost) {
        api.deletePost(post._id).then((delitingPost) => {
                const newPosts = posts.filter(
                    (curPost) => curPost._id !== delitingPost._id
                );
                setPosts(newPosts);
            })
        }
            // : alert("Вы не можете удалить чужой пост");
        // handleClose();
    }


    modalActive || 
    modalUserActive || 
    modalInfoAboutUser || 
    modalPostUser || 
    modalLogin || 
    modalRegistr ? document.body.style.overflow = "hidden" : document.body.style.overflow = "scroll"

    return (
        <div className="App" >
            <UserContext.Provider value={{currentUser, setCurrentUser }} >
                <Header
                    popupEdit={modalUserActive}
                    setPopupEdit={setModalUserActive}
                    scrollTop={scrollTop}
                    setModalLogin={setModalLogin}
                    setModalRefistr={setModalRegistr}
                    isAuth={isAuth}
                    setIsAuth={setIsAuth}
                />
                {isAuth 
                ? 
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
                                anchorAddDelEditComment={anchorAddDelEditComment}
                                setAnchorAddDelEditComment={setAnchorAddDelEditComment}
                                anchorEditUser={anchorEditUser}
                                modalAbout={modalInfoAboutUser}
                                setModalAbout={setModalInfoAboutUser}
                                modalPostUser={modalPostUser}
                                setModalPostUser={setModalPostUser}
                            />
                        }
                    ></Route>
                    <Route path="*"
                        element={<NotFoundPage/>}>
                    </Route>
                </Routes>
                : 
                <>
                {/* <GuestPage/> */}
                <Routes>
                    <Route
                        // index
                        path="fo_homework4_post4/"
                        element={
                            <GuestPage/>
                        }>
                    </Route>
                    <Route 
                        path="fo_homework4_post4/login"
                        element={
                            <GuestPage/>
                        }>
                    </Route>
                    <Route 
                        path="fo_homework4_post4/registration"
                        element={
                            <GuestPage/>
                        }>
                    </Route>
                </Routes>
                <SecondPopup popup={modalLogin} setPopup={setModalLogin}>
                    <Login
                        modalLogin={modalLogin}
                        setModalLogin={setModalLogin}
                        setIsAuth={setIsAuth}/>
                </SecondPopup>
                <SecondPopup popup={modalRegistr} setPopup={setModalRegistr}>
                    <Registration
                        modalRegistr={modalRegistr}
                        setModalRegistr={setModalRegistr}
                    />
                </SecondPopup>
                </>
                }
                <Popup popup={modalActive} setPopup={setModalActive}>
                        {modalActive && <Newpost setPopup={setModalActive} setPosts={setPosts} anchorNewPost={anchorNewPost} setAnchorNewPost={setAnchorNewPost}/>}
                </Popup>
                <Popup popup={modalUserActive} setPopup={setModalUserActive}>
                        {modalUserActive && <Edituser setPopup={setModalUserActive} anchorEditUser={anchorEditUser} setAnchorEditUser={setAnchorEditUser}/>}
                </Popup>

            </UserContext.Provider>
        </div>
    );
}

export default App;
