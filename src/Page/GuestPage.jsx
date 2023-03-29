import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from '../components/Slider/Slider'
import "./index.css"

export default function GuestPage() {

  const [stopAnimation, setStopAnimation] = useState(false)
  const navigate = useNavigate()

  const mouseLeft = () => {
    setTimeout (() => { 
      setStopAnimation(false)
    }, 1000)
  }

  return (
    <div className='container'>
      <h1 className='title'>Добро пожаловать</h1>
      <div className="main__wrapper">
        <div className="main__slider"  onMouseEnter={() => setStopAnimation(true)} onMouseLeave={mouseLeft}>
            <Slider stopAnimation={stopAnimation}>
            </Slider>
        </div>
        <div className='main__text'>
          <h4>Здесь собраны посты на различные темы.</h4>
          <p>Каждый найдет что-то интересное!</p>
          <p>Чтобы начать пользоваться, необходимо пройти <span className="guest__link" onClick={() => navigate('/fo_homework4_post4/registration')}>регистрацию</span> или осуществить <span className="guest__link" onClick={() => navigate('/fo_homework4_post4/login')}>вход</span></p>
        </div>
      </div>
    </div>
  )
}
