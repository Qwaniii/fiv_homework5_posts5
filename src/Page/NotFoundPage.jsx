import { Link } from 'react-router-dom'
import React from 'react'
import s from "./notfoundpage.module.css"
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function NotFoundPage() {
  return (
    <div>
        <div className={s.container}>
          <SearchOffIcon sx={{ fontSize: 80 }} color="disabled"/>
          <div className={s.notfound}>Страница не найдена</div>
          <Link to="/" >
            <div className={s.btn}>На главную</div>
          </Link>
        </div>
    </div>
  )
}
