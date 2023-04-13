import { useEffect, useState } from "react"
import s from "./slider.module.css"
import data from "../../DB/data"
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { Link } from "react-router-dom";

const Slider = ({ stopAnimation }) => {

    const random = Math.round(Math.random() * 2)

    const [position, setPosition] = useState(random);



    const nextFunc = () => {
        setPosition(position < data.length - 1  ? position + 1 : 0)
    }

    const prevFunc = () => {
        setPosition(position !== 0 ? position - 1 : data.length - 1)
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
                       <Link to='/fo_homework4_post4/login' key={slide.title + index} style={{color: "inherit"}}>
                            <div  className={s.container}>
                                <img className={s.image} src={slide.image} alt={slide.title}></img>
                                <h3>{slide.title}</h3>
                                <p>{slide.text}</p>
                            </div>
                        </Link>
                ))}
                {stopAnimation &&
                <>
                <div onClick={() => nextFunc()} className={s.right}><ArrowForwardIosOutlinedIcon fontSize="large"/></div>
                <div onClick={() => prevFunc()} className={s.left}><ArrowBackIosOutlinedIcon fontSize="large"/></div></>}
            </div>
        </div>
    )
}

export default Slider