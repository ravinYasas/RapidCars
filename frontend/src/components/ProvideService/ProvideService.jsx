import './ProvideService.css'
import React from 'react'
import { assets } from '../../assets/assets'

const ProvideService = () => {
  return (
    <div className='provideService-container'>
        <div className="provideService-box">
            <img src={assets.exchange_icon} alt="" />
        <h4>Auction-Grade Transparency</h4>
        <p>Original Japanese auction sheets and condition reports for every vehicle.</p>
        </div>
        <div className="provideService-box">
            <img src={assets.quality_icon} alt="" />
        <h4>LC In Your Name</h4>
        <p>Open LC directly in your name for full financial clarity and control.</p>
        </div>
        <div className="provideService-box">
            <img src={assets.support_img} alt="" />
        <h4>Ready For The Road</h4>
        <p>English conversion and full feature walkthrough before you take delivery.</p>
        </div>
    </div>
  )
}

export default ProvideService