import React from 'react'
import s from "./footer.module.css"
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import { Link } from 'react-router-dom';


export default function Footer() {

  const date = new Date()
  const toUp = () => {
    window.scrollTo({
        top: 0,
        behavior: "auto" 
    })
}

  return (
    <div className={s.footer}>
          <Link to="/fo_homework4_post4" onClick={() => toUp()} className={s.logo}>
              <ImportContactsOutlinedIcon fontSize='large'/>
              <div>made by Oleg &copy; {date.getFullYear()}</div>
          </Link>
    </div>
  )
}
