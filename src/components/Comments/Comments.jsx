import { Typography } from '@mui/material'
import React from 'react'
import s from "./comments.module.css"

export default function Comments({ comment }) {

    const created = new Date(comment.created_at);

  return (
    <div>
        <div className={s.container}>
            <div className={s.inner}>
                <div className={s.author}>
                    <div className={s.avatar}>
                        <img src={comment?.author?.avatar}></img>
                    </div>
                    <div className={s.info}>
                        <div className={s.name}>
                            {comment?.author?.name}
                        </div>
                        <div className={s.time}>
                            {created.toLocaleDateString("ru-RU", {
                                month: "2-digit",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </div>
                    </div>
                </div>
                <Typography variant="body2" color="text.primary" className={s.text}>
                    {comment.text}
                </Typography>

            </div>
        </div>
    </div>
  )
}
