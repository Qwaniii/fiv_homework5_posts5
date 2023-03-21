import { useState } from "react"
import s from "./slider.module.css"
import cn from "classnames"

const Slider = () => {

    const obj = [{
        image: "https://postmania.ru//files/products/0382-a.800x600.jpg"
    },
    {
        image: "https://prokocmoc.ru/wp-content/uploads/2019/09/Sirius-zvezda.jpg"
    },
    {
        image: "https://oir.mobi/uploads/posts/2021-04/1619183869_43-oir_mobi-p-khitraya-lisa-zhivotnie-krasivo-foto-49.jpg"
    }]

    const [position, setPosition] = useState(0);
    const [anchor, setAnchor] = useState(true)
    const [anchorSec, setAnchorSec] = useState(false)

    const nextFunc = () => {
        setAnchor(!anchor)
        if ((position + 2) % 2 === 0) {
            setAnchorSec(!anchorSec)
        }
        setPosition(position < 2  ? position + 1 : 0)
    }
 
    return (
        <div>
            <img className={cn(s.image, {[s.active]: anchor}, {[s.nonactive]: (anchorSec && anchor)})} src={obj[position].image}></img>
            <button onClick={() => nextFunc()}>Next</button>
        </div>
    )
}

export default Slider