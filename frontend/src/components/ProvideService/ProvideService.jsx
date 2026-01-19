import './ProvideService.css'
import React from 'react'
import { assets } from '../../assets/assets'

const ProvideService = () => {
  return (
    <div className='provideService-container'>
        <div className="provideService-box">
            <img src={assets.exchange_icon} alt="" />
            <h4>Exchange Policy</h4>
            <p>We offer hassle free echange offer</p>
        </div>
        <div className="provideService-box">
            <img src={assets.quality_icon} alt="" />
            <h4>7 days  return policy</h4>
            <p>we provide 7 days free return ploicy</p>
        </div>
        <div className="provideService-box">
            <img src={assets.support_img} alt="" />
            <h4>Best Customer Supoort</h4>
            <p>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default ProvideService