import React from 'react'
import s from "./aboutanotheruser.module.css"

export default function AboutAnotherUser({ commentInfo, setPopup }) {
    const backgtoundAvatar = "http://cdn.onlinewebfonts.com/svg/img_506770.png"
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
            </div>
    )
}