import React, { useContext } from 'react'
import s from './header.module.css'
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import cn from "classnames"
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Header({ setPopupEdit, scrollTop, setModalLogin }) {
    const scrollNum = 178

    const { currentUser } = useContext(UserContext)

  return (
    <div>
        <div className={cn(s.header, { [s.scroll]: scrollTop > scrollNum })}>
            <div className={cn(s.container, {[s.scroll]: scrollTop > scrollNum})}>
                <div className={cn(s.inner, {[s.scroll]: scrollTop > scrollNum})}>
                    <Link to="/fo_homework4_post4">
                        <div className={s.logo}>
                            <ImportContactsOutlinedIcon fontSize='large'/> POSTS
                        </div>
                    </Link>
                    <div>
                        <button onClick={() => setModalLogin(true)}>Войти</button>
                    </div>
                    <div className={s.enter} onClick={() => setPopupEdit(true)}>
                        {/* {!currentUser && <a className={s.link}>Войти</a>} */}
                        {currentUser && 
                        <div title="Редактировать" className={cn(s.info, {[s.scroll]: scrollTop > 178})}> <img src={currentUser.avatar} alt={currentUser.name}></img>
                            <span>{currentUser.name}</span>
                            {scrollTop <= scrollNum && <span>{currentUser.about}</span>}
                            {scrollTop <= scrollNum && <span>{currentUser.email}</span>}
                        </div>
}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
