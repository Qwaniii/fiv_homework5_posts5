import React from "react"
import s from "./aboutuser.module.css"

const AboutUser = ({ children, name }) => {
    return(
        <div className={s.container}>
            <div className={s.name}>{name}</div>
            <div className={s.children}>{children}</div>
        </div>
    )
}

export default AboutUser