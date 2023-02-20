import React from 'react'
import s from './header.module.css'
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import Popup from '../Popup/Popup';
import cn from "classnames"
import { Link } from 'react-router-dom';

export default function Header({ currentUser, popupEdit, setPopupEdit, scrollTop }) {
  return (
    <div>
        <div className={cn(s.header, { [s.scroll]: scrollTop > 178 })}>
            <div className={cn(s.container, {[s.scroll]: scrollTop > 178})}>
                <div className={s.inner}>
                    <Link to={"/"}>
                        <div className={s.logo}>
                            <ImportContactsOutlinedIcon fontSize='large'/> POSTS
                        </div>
                    </Link>
                    <div className={s.enter} onClick={() => setPopupEdit(true)}>
                        {!currentUser && <a href="#" className={s.link}>Войти</a>}
                        <a title="Редактировать" href="#"> {currentUser && 
                        <div className={cn(s.info, {[s.scroll]: scrollTop > 178})}> <img src={currentUser.avatar}></img>
                            <span>{currentUser.name}</span>
                            {scrollTop <= 178 && <span>{currentUser.about}</span>}
                            {scrollTop <= 178 && <span>{currentUser.email}</span>}
                        </div>
                        }</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
