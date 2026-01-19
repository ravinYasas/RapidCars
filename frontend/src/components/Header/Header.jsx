import './Header.css'
import { assets } from '../../assets/assets'

import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const slides = useMemo(()=>[
    assets.hero_img,
    assets.hero1_img,
    assets.hero2_img,
    assets.hero3_img,
    assets.hero4_img,
    assets.hero5_img,
    assets.hero6_img,
    assets.hero7_img,
    assets.hero8_img,
    assets.hero9_img,
    assets.hero10_img
  ],[])

  const [active,setActive] = useState(0)

  useEffect(()=>{
    const id = setInterval(()=>{
      setActive(prev => (prev + 1) % slides.length)
    },5000)
    return ()=>clearInterval(id)
  },[slides.length])

  return (
    <div className='header'>
        <div className="header-left">
            <div className="header-title">
                <div className='header-line'></div>
                <p>RAPID CARS • JAPAN DIRECT</p>
            </div>
            <div className='header-main' >
              <h2>Direct Vehicle Imports from Japan</h2>
                <p className="header-subtitle">We deliver trust from Japan with a transparent, step-by-step pre-ordering experience you can follow from auction to handover.</p>
            </div>
            <ul className="header-list">
              <li>Direct imports with original Japanese auction sheets</li>
              <li>LC can be opened in your name for full financial clarity</li>
              <li>Trim, options, and pricing explained with no hidden costs</li>
              <li>Japanese systems converted to English and features demonstrated</li>
            </ul>
            <div className='header-button'>
              <button onClick={()=>navigate('/collection')}>Start Your Import</button>
                 <div className="header-line"></div>
            </div>
        </div>
        <div className="header-right">
            {slides.map((src,i)=>(
              <img
                key={i}
                className={`hero-slide ${i===active ? 'active' : ''}`}
                src={src}
                alt="Rapid Cars hero"
              />
            ))}
        </div>
    </div>
  )
}

export default Header