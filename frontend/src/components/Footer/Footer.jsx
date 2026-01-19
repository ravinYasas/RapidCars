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
          <img className="footer-logo-small" src={assets.logo} alt="Rapid Cars logo" />
          <p>Rapid Cars delivers direct vehicle imports from Japan with full transparency. We guide you from auction sheet to handover with clear pricing, LC in your name, and every feature explained so you can drive away with confidence.</p>
        </div>
        <div className="footer-center">
                <h2>COMPANY</h2>
            <ul >
                  <li>Home</li>
                  <li>About Rapid Cars</li>
                  <li>Pre-order Guide</li>
                  <li>Transparency Policy</li>
            </ul>
        </div>
        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
            <ul>
                   <li>+94 77 590 5443</li>
                   <li>hello@rapidcars.com</li>
                   <li>No.48/E Wataddara, Veyangoda, Gampaha, Sri Lanka</li>
            </ul>
        </div>
    </div>
    <hr />
    <p className="footer-copyright">
        Rapid Cars © 2026 — All rights reserved
    </p>
    </div>
    </>
  )
  
}

export default Footer