import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Edituser from "./components/EditUser/Edituser";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Registration from "./components/Login/Registration";
import Notification from "./components/Notification/Notification";
import Popup from "./components/Popup/Popup";
import SecondPopup from "./components/PopupSecond/SecondPopup";
import { UserContext } from "./Context/UserContext";
import useDebounce from "./hooks/useDebounse";
import Newpost from "./components/NewPost/Newpost.jsx";
import GuestPage from "./Page/GuestPage";
import MainPage from "./Page/MainPage";
import MyPostPage from "./Page/MyPostPage";
import NotFoundPage from "./Page/NotFoundPage";
import PostPage from "./Page/PostPage";
import FavoritePage from "./Page/FavoritePage";
import api from "./utils/Api";
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import { useDispatch, useSelector } from "react-redux";
import { maxPageAction } from "./storage/reducers/paginateReducers";
import ForgotPassword from "./components/Login/ForgotPassword";
import MyCommentPage from "./Page/MyCommentPage";
import UpperNotific from "./components/UpperNotific/UpperNotific";
import Footer from "./components/Footer/Footer";
import ProtectedRoutePage from "./Page/ProtectedRoutePage";

function App() {
    const [posts, setPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [myComments, setMyComments] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [scrollTop, setScrollTop] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState("stock");
    const [isAuth, setIsAuth] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [userLogin, setUserLogin] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(() => () => null)
    const [postFromCommets, setPostFromComments] = useState([])
    const [visibleUser, setVisibleUser] = useState(false)
    const [visiblePost, setVisiblePost] = useState(false)
    // стэйты - модальные окна
    const [modalActive, setModalActive] = useState(false);
    const [modalUserActive, setModalUserActive] = useState(false);
    const [modalInfoAboutUser, setModalInfoAboutUser] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);
    const [modalRegistr, setModalRegistr] = useState(false);
    const [modalPostUser, setModalPostUser] = useState(false);
    const [modalResetPass, setModalResetPass] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    //anchors
    const [anchorEl, setAnchorEl] = useState(true);
    const [anchorEditUser, setAnchorEditUser] = useState(false);
    const [anchorNewPost, setAnchorNewPost] = useState(false);
    const [anchorAddDelEditComment, setAnchorAddDelEditComment] = useState(false);
    const [anchorLike, setAnchorLike] = useState(false)

    //получаем токен из стораджа
    const token = sessionStorage.getItem("token")
    const dispatch = useDispatch()
    const viewPosts = useSelector(state => state.paginate.viewPosts)

    const debounceValue = useDebounce(searchQuery, 500)

    //получаем посты и данные пользователя с сервера
    useEffect(() => {
        if(isAuth && !searchQuery) {        
            api.getAppInfo().then(([postsData, currentUserData]) => {
            setPosts(postsData);
            setCurrentUser(currentUserData);
            //фильтруем "мои посты" и "любимые посты"
            setMyPosts(postsData.filter((post) => post.author._id === currentUserData._id))
            setFavorite(postsData.filter(post => (post.likes).some(like => like === currentUserData._id)))
            // setNumberComments(postsData.map((item) => item.comments.length))
            // фильтруем посты с моими комментариями
            setPostFromComments(postsData.filter(post => (post.comments).some(comment => comment.author === currentUser._id)))
            setIsLoading(true);
            dispatch(maxPageAction(Math.ceil(postsData.length / viewPosts)))
        });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchorEditUser, anchorNewPost, anchorAddDelEditComment, isAuth, anchorLike, viewPosts, dispatch]);


    //поиск
    useEffect(() => {
       if(isAuth) { 
        api.search(debounceValue)
            .then((data) => {
                //пагинация в зависимоти от итогов поиска
                dispatch(maxPageAction(Math.ceil(data.length / viewPosts)))
                setPosts(data);
        });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue, isAuth, viewPosts]);

    //получаем все комментарии с сервера и забираем свои
    useEffect(() => {
        if(isAuth) { 
        api.getAllComments()
            .then(data => {
                setMyComments(data.filter(post => post.author._id === currentUser._id))
            })
        }
    }, [currentUser._id, anchorAddDelEditComment, isAuth])

    //добавляем событие скрола
    useEffect(() => {
        const handleScroll = event => {
          setScrollTop(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    //функция установки и снятия лайка
    function handlePostLike(post, array, setArray) {
        //check my likes on posts
        const isLiked = post.likes.some((el) => el === currentUser._id);
        isLiked
            ? api.deleteLikePost(post._id).then((newPost) => {
                  const newPosts = array.map((curPost) =>
                      curPost._id === newPost._id ? newPost : curPost
                  );
                  setArray(newPosts);
              })
            : api.getLikePost(post._id).then((newPost) => {
                  const newPosts = array.map((curPost) =>
                      curPost._id === newPost._id ? newPost : curPost
                  );
                  setArray(newPosts);
              });
        //anchor для синхронизации лайков главной страницы и страницы поста 
        setAnchorLike(!anchorLike)
    }

    //меняем статус при получении токена
    useEffect(() => {
        if (token) setIsAuth(true)
    }, [token])


    //удаление поста
    function handlePostDelete(post) {
        // const isAuthor = post.author._id === currentUser._id ? true : false;
        // isAuthor
        //     ? 
        // setAnchDel(false)
        // setConfirmDelete(true)
        api.deletePost(post._id).then((delitingPost) => {
                const newPosts = posts.filter(
                    (curPost) => curPost._id !== delitingPost._id
                );
                setPosts(newPosts);
                setAnchorNewPost(!anchorNewPost)
            })
        setModalDelete(false)
        setConfirmDelete(() => () => null)
            // : alert("Вы не можете удалить чужой пост");
        // handleClose();
    }

    //скролл наверх
    const toUp = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" 
        })
    }, [])

    //блокировка скролла при открытие модального окна
    modalActive || 
    modalUserActive || 
    modalInfoAboutUser || 
    modalPostUser || 
    modalLogin || 
    modalRegistr ? document.body.style.overflow = "hidden" : document.body.style.overflow = "scroll"

    return (
        <div className="App" >
            <UserContext.Provider value={{currentUser, setCurrentUser }}>
                <Header
                    popupEdit={modalUserActive}
                    setPopupEdit={setModalUserActive}
                    scrollTop={scrollTop}
                    setModalLogin={setModalLogin}
                    setModalRefistr={setModalRegistr}
                    isAuth={isAuth}
                    setIsAuth={setIsAuth}
                    setSelectedTab={setSelectedTab}
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
                                setPosts={setPosts}
                                onPostLike={handlePostLike}
                                active={searchActive}
                                setActive={setSearchActive}
                                postDelete={handlePostDelete}
                                anchorEl={anchorEl}
                                setAnchorEl={setAnchorEl}
                                setSearchQuery={setSearchQuery}
                                searchQuery={searchQuery}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                setSelectedTab={setSelectedTab}
                                selectedTab={selectedTab}
                                setPopupEdit={setModalActive}
                                setConfirmDelete={setConfirmDelete}
                                setModalDelete={setModalDelete}
                        
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
                                anchorLike={anchorLike}
                                setAnchorLike={setAnchorLike}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                anchorAddDelEditComment={anchorAddDelEditComment}
                                setAnchorAddDelEditComment={setAnchorAddDelEditComment}
                                anchorEditUser={anchorEditUser}
                                modalAbout={modalInfoAboutUser}
                                setModalAbout={setModalInfoAboutUser}
                                modalPostUser={modalPostUser}
                                setModalPostUser={setModalPostUser}
                                setModalDelete={setModalDelete}
                                setConfirmDelete={setConfirmDelete}

                                
                            />
                        }
                    ></Route>
                    <Route
                        path="fo_homework4_post4/my-posts"
                        element={
                            <MyPostPage
                                posts={myPosts}
                                setPosts={setMyPosts}
                                onPostLike={handlePostLike}
                                active={searchActive}
                                setActive={setSearchActive}
                                postDelete={handlePostDelete}
                                anchorEl={anchorEl}
                                setAnchorEl={setAnchorEl}
                                setSearchQuery={setSearchQuery}
                                searchQuery={searchQuery}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                setSelectedTab={setSelectedTab}
                                selectedTab={selectedTab}
                                setPopupEdit={setModalActive}
                                setConfirmDelete={setConfirmDelete}
                                setModalDelete={setModalDelete}
                       
                            />
                        }
                    ></Route>
                    <Route
                        path="fo_homework4_post4/favorite"
                        element={
                            <FavoritePage
                                posts={favorite}
                                setPosts={setFavorite}
                                onPostLike={handlePostLike}
                                active={searchActive}
                                setActive={setSearchActive}
                                postDelete={handlePostDelete}
                                anchorEl={anchorEl}
                                setAnchorEl={setAnchorEl}
                                setSearchQuery={setSearchQuery}
                                searchQuery={searchQuery}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                setSelectedTab={setSelectedTab}
                                selectedTab={selectedTab}
                                setPopupEdit={setModalActive}
                                setConfirmDelete={setConfirmDelete}
                                setModalDelete={setModalDelete}
             
                            />
                        }
                    ></Route>
                    <Route
                        path="fo_homework4_post4/my-comments"
                        element={
                            <MyCommentPage
                                postFromCommets={postFromCommets}
                                myComments={myComments}
                                setMyComments={setMyComments}
                                anchorAddDelEditComment={anchorAddDelEditComment}
                                setAnchorAddDelEditComment={setAnchorAddDelEditComment}
                                setModalDelete={setModalDelete}
                                setConfirmDelete={setConfirmDelete}
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
                    <Route 
                        path="fo_homework4_post4/reset-password"
                        element={
                            <GuestPage/>
                        }>
                    </Route>
                    <Route path="*"
                        element={<NotFoundPage/>}>
                    </Route>

                    <Route element={<ProtectedRoutePage/>}>
                        <Route path="fo_homework4_post4/post/:postId"
                                element={<GuestPage/>}/>
                        <Route path="fo_homework4_post4/my-posts"
                                element={<GuestPage/>}/>
                        <Route path="fo_homework4_post4/favorite"
                                element={<GuestPage/>}/>
                        <Route path="fo_homework4_post4/my-comments"
                                element={<GuestPage/>}/>
                    </Route>

                </Routes>
                <SecondPopup popup={modalLogin} setPopup={setModalLogin}>
                    <Login
                        modalLogin={modalLogin}
                        setModalLogin={setModalLogin}
                        setIsAuth={setIsAuth}
                        userLogin={userLogin}
                        setUserLogin={setUserLogin}
                        setIsSuccess={setIsSuccess}
                        />
                </SecondPopup>
                <SecondPopup popup={modalRegistr} setPopup={setModalRegistr}>
                    <Registration
                        modalRegistr={modalRegistr}
                        setModalRegistr={setModalRegistr}
                        setUserLogin={setUserLogin}
                    />
                </SecondPopup>
                <SecondPopup popup={modalResetPass} setPopup={setModalResetPass}>
                    <ForgotPassword
                        modalResetPass={modalResetPass}
                        setModalResetPass={setModalResetPass}
                    />
                </SecondPopup>
                
                </>
                }
                {modalActive && 
                    <Popup popup={modalActive} setPopup={setModalActive}>
                            <Newpost setPopup={setModalActive} setPosts={setPosts} anchorNewPost={anchorNewPost} setAnchorNewPost={setAnchorNewPost} setSelectedTab={setSelectedTab} setVisiblePost={setVisiblePost}/>
                    </Popup>}
                {modalUserActive && 
                    <Popup popup={modalUserActive} setPopup={setModalUserActive}>
                            <Edituser 
                                setPopup={setModalUserActive} 
                                anchorEditUser={anchorEditUser}     
                                setAnchorEditUser={setAnchorEditUser}
                                setVisibleUser={setVisibleUser}/>
                    </Popup>}
                <SecondPopup popup={isSuccess} setPopup={setIsSuccess}>
                    <Notification title="Добро пожаловать" text={userLogin?.name || "Гость"} close={setIsSuccess}/>
                </SecondPopup>
                <SecondPopup popup={modalDelete} setPopup={setModalDelete}>
                    <Notification title="Удаление" text="Вы уверены, что хотите удалить пост?" close={setModalDelete} color={true}>
                        <button className="btn" onClick={confirmDelete}>Удалить</button>
                        <button className="btn" onClick={() => setModalDelete(false)}>Отмена</button>
                    </Notification>
                </SecondPopup>
                <UpperNotific message="Изменения сохранены" visible={visibleUser} setVisible={setVisibleUser}/>
                <UpperNotific message="Пост добавлен" visible={visiblePost} setVisible={setVisiblePost}/>
                {scrollTop > 178 && <div className="scroll" onClick={() => toUp()}><NorthOutlinedIcon/></div>}
            </UserContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
