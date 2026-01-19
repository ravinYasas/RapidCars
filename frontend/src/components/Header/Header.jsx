import './Header.css'
import { assets } from '../../assets/assets'

import React from 'react'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-left">
            <div className="header-title">
                <div className='header-line'></div>
                <p>RAPID CARS • JAPAN DIRECT</p>
            </div>
            <div className='header-main' >
                <h2>More Than Just Vehicle Imports</h2>
                <p className="header-subtitle">We deliver trust from Japan with a transparent, step-by-step pre-ordering experience you can follow from auction to handover.</p>
            </div>
            <ul className="header-list">
              <li>Direct imports with original Japanese auction sheets</li>
              <li>LC can be opened in your name for full financial clarity</li>
              <li>Trim, options, and pricing explained with no hidden costs</li>
              <li>Japanese systems converted to English and features demonstrated</li>
            </ul>
            <div className='header-button'>
                <button>Start Your Import</button>
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