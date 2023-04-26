import React, { useEffect, useState } from 'react'
import api from '../../utils/Api'
import s from "./userslikes.module.css"

export default function UsersLikes({ like, setModalLike, setAboutUserLike }) {

  const [likeUser, setLikeUser] = useState({})

  useEffect(() => {
    api.getInfoAboutUser(like)
      .then(data => setLikeUser(data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const aboutFunc = () => {
    setAboutUserLike({author: likeUser})
    setModalLike(true)
  }


  return (
    <div className={s.wrapper}>
      <div className={s.imgWrapper}><img src={likeUser.avatar} alt={likeUser.name}></img></div>
      <div className={s.name} onClick={() => aboutFunc()}>{likeUser.name}</div>
    </div>
  )
}
