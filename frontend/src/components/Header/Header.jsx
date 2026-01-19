import './Header.css'
import { assets } from '../../assets/assets'

import React from 'react'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-left">
            <div className="header-title">
                <div className='header-line'></div>
                <p>OUR BESTSELLERS</p>
            </div>
            <div className='header-main' >
                <h2>Latest Arrivals</h2></div>
            
            <div className='header-button'>
                <button>SHOP NOW</button>
                 <div className="header-line"></div>
            </div>
        </div>
        <div className="header-right">
            <img src={assets.hero_img} alt="" />
        </div>
    </div>
  )
}

export default Header