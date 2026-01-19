import './Footer.css'
import {assets} from '../../assets/assets'
import React from 'react'
import Subcribe from '../Subctribe/Subcribe'

const Footer = () => {
  return (
      <>
      <Subcribe/>
    <div className="footer">
    <div className='footer-content'>
        <div className="footer-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quasi officia laborum assumenda excepturi corporis cumque necessitatibus, mollitia deleniti voluptate. Tempora vitae sunt excepturi rem accusamus nemo fuga molestias fugit!</p>
        </div>
        <div className="footer-center">
            <h2>COMPANY</h2>
            <ul >
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privancy policy</li>
            </ul>
        </div>
        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
            <ul>
               <li>+1-212-456-7890</li>
               <li>kavishka@gmail.com</li>
            </ul>
        </div>
    </div>
    <hr />
    <p className="footer-copyright">
        Copyright 2024 @forever.com - All  Right Reserved
    </p>
    </div>
    </>
  )
  
}

export default Footer