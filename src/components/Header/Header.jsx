import React from 'react'
import s from './header.module.css'
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';

export default function Header({ currentUser }) {
  return (
    <div>
        <div className={s.header}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.logo}>
                        <ImportContactsOutlinedIcon fontSize='large'/> POSTS
                    </div>
                    <div className={s.enter}>
                        {!currentUser && <a href="#" className={s.link}>Войти</a>}
                        <a title="Редактировать" href="#"> {currentUser && 
                        <div className={s.info}> <img src={currentUser.avatar}></img>
                            <span>{currentUser.name}</span>
                            <span>{currentUser.about}</span>
                            <span>{currentUser.email}</span>
                        </div>
                        }</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
