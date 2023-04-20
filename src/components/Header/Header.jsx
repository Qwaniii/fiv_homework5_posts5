import React, { useCallback, useContext, useEffect, useState } from 'react'
import s from './header.module.css'
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import cn from "classnames"
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import AboutUser from '../AboutUser/AboutUser';
import { useDispatch } from 'react-redux';
import { nextPageAction } from '../../storage/reducers/paginateReducers';

export default function Header({ setPopupEdit, scrollTop, setModalLogin, setModalRegistr, isAuth, setIsAuth, setSelectedTab }) {
    const scrollNum = 178

    //контект информации о пользователе
    const { currentUser } = useContext(UserContext)
    const [aboutUser, setAboutUser] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleKeyPress = useCallback((event) => {
        if (event.key === "Escape") setAboutUser(false) 
      }, [setAboutUser]);
      
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    //функции в выпадающем окне личного кабинета
    const editMenu = () => {
        setPopupEdit(true)
        setAboutUser(false)
    }

    const exitMenu = () => {
        sessionStorage.removeItem("token")
        navigate("/fo_homework4_post4")
        setAboutUser(false)
        setIsAuth(false)
    }

    const myPostsMenu = () => {
        navigate("/fo_homework4_post4/my-posts")
        dispatch(nextPageAction(1))
        setAboutUser(false)
    }

    const favoriteMenu = () => {
        navigate("/fo_homework4_post4/favorite")
        dispatch(nextPageAction(1))
        setAboutUser(false)
    }

    const myCommentsMenu = () => {
        navigate("/fo_homework4_post4/my-comments")
        setAboutUser(false)
    }

    const toUp = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto" 
        })
    }, [])

    const homePage = useCallback(() => {
        setSelectedTab("stock")
        toUp()
        dispatch(nextPageAction(1))
    }, [dispatch, setSelectedTab, toUp])

  return (
    <div>
        <div className={cn(s.header, { [s.scroll]: scrollTop > scrollNum })}>
            <div className={cn(s.container, {[s.scroll]: scrollTop > scrollNum})}>
                <div className={cn(s.inner, {[s.scroll]: scrollTop > scrollNum})}>
                    <Link to="/fo_homework4_post4" onClick={() => homePage()}>
                        <div className={s.logo}>
                            <ImportContactsOutlinedIcon fontSize='large'/> POSTS
                        </div>
                    </Link>
                    {!isAuth 
                    ? 
                    <div className={s.auth}>
                        <Link to="/fo_homework4_post4/login" >
                            <button className={s.enter}>Войти</button>
                        </Link>
                        <Link to="/fo_homework4_post4/registration" >
                            <div className={s.registr}>Регистрация</div>
                        </Link>
                    </div>
                    :
                    <div className={s.containerUser} >
                        <div title="Личный кабинет" onClick={() => setAboutUser(true)} className={cn(s.info, {[s.scroll]: scrollTop > 178})}> <img src={currentUser.avatar} alt={currentUser.name}></img>
                            <span>{currentUser.name}</span>
                            {scrollTop <= scrollNum && <span className={s.about}>{currentUser.about}</span>}
                            {scrollTop <= scrollNum && <span>{currentUser.email}</span>}
                        </div>
                        {aboutUser && 
                        <>
                            <div className={cn(s.aboutUser, {[s.scroll]: scrollTop > scrollNum})}>
                                <AboutUser name={currentUser.name} 
                                            about={scrollTop > scrollNum ? currentUser.about : ""} 
                                            email={scrollTop > scrollNum ? currentUser.email : ""} 
                                            exit={exitMenu}
                                            close={() => setAboutUser(false)}
                                            >   
                                    <ul>
                                        <li className={s.link} onClick={() => editMenu()}>Редактировать</li>
                                        <li className={s.link} onClick={() => myPostsMenu()}>Мои посты</li>
                                        <li className={s.link} onClick={() => favoriteMenu()}>Мне нравится</li>
                                        <li className={s.link} onClick={() => myCommentsMenu()}>Мои комментарии</li>
                                    </ul>
                                </AboutUser>
                            </div>
                            <div className={s.wrapperUser} onClick={() => setAboutUser(false)}>
                            </div>
                        </>}
                    </div>}
                </div>

            </div>
        </div>
    </div>
  )
}
