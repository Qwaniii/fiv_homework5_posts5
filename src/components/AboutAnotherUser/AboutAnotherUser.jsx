import React, { useContext } from 'react'
import s from "./aboutanotheruser.module.css"
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import api from '../../utils/Api';

export default function AboutAnotherUser({ commentInfo, setPopup }) {
    const backgtoundAvatar = "http://cdn.onlinewebfonts.com/svg/img_506770.png"
    const navigate = useNavigate()
    const { setUserComments } = useContext(UserContext)

    const postsLink = () => {
        setPopup(false)
        navigate(`/fo_homework4_post4/post-user/${commentInfo.author._id}`)
    }

    const commentsLink = () => {
        setPopup(false)
        navigate(`/fo_homework4_post4/user-comments/${commentInfo.author._id}`)
        api.getAllComments().then((data) => {
            setUserComments(
              data.filter((post) => post.author._id === commentInfo.author._id)
            );
          });
    }



    return (
            <div className={s.container}>
                    <h3>Информация о пользователе</h3>
                <div className={s.wrapper}>
                    <div className={s.formUser}>
                        <div className={s.avaUser}>
                            <div className={s.imgwrapper}>
                                <img className={s.image} src={commentInfo?.author?.avatar || backgtoundAvatar} alt={commentInfo?.author?.name}></img>
                            </div>
                        </div>
                        <div className={s.infoUser}>
                            <div className={s.main}>
                                <span className={s.name}>Имя:</span>
                                <span className={s.value}>{commentInfo?.author?.name}</span>
                            </div>
                            {commentInfo?.author?.about &&
                            <div className={s.main}>
                                <span className={s.name}>Информация:</span>
                                <span className={s.value}>{commentInfo?.author?.about}</span>
                            </div>}
                            {commentInfo?.author?.group &&
                            <div className={s.main}>
                                <span className={s.name}>Группа:</span>
                                <span className={s.value}> {commentInfo?.author?.group}</span>
                            </div>}
                        </div>
                    </div>
                </div>
                <span className={s.close} onClick={() => setPopup(false)}>&times;</span>
                <FilterNoneIcon onClick={() => postsLink()}/>
                <ChatBubbleOutlineIcon onClick={() => commentsLink()}/>
            </div>
    )
}