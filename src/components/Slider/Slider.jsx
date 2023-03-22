import { useEffect, useState } from "react"
import s from "./slider.module.css"
import data from "../../DB/data"

const Slider = ({ stopAnimation }) => {

    const random = Math.round(Math.random() * 2)

    const [position, setPosition] = useState(random);



    const nextFunc = () => {
        setPosition(position < 2  ? position + 1 : 0)
    }

    const prevFunc = () => {
        setPosition(position !== 0 ? position - 1 : 2)
    }

    useEffect(() => {
        if(!stopAnimation) {
        const interval = setInterval(() => {
            nextFunc()
        }, 3000);
        return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position, stopAnimation])

 
    return (
        <div>
            <div className={s.wrapper}>
                {data.map((slide, index) => (
                       (index === position) &&
                       <div key={slide.title + index} className={s.container}>
                            <img className={s.image} src={slide.image} alt={slide.title}></img>
                            <h3>{slide.title}</h3>
                            <p>{slide.text}</p>
                        </div>
                ))}
                {stopAnimation &&
                <>
                <div onClick={() => nextFunc()} className={s.right}>&gt;</div>
                <div onClick={() => prevFunc()} className={s.left}>&lt;</div></>}
            </div>
        </div>
    )
}

export default Slider