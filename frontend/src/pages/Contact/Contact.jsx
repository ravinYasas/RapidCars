import './Contact.css'
import {assets} from '../../assets/assets'
import React from 'react'

const Contact = () => {
  return (
    <div className='contact-container'>
        
        <div className="contact-topic">
          <h2>CONTACT <span>US</span></h2>
          <p className="contact-bar"></p>
        </div>
        <div className="contact-middle">
          <img src={assets.contact_img} alt="" />

          <div className="contact-details">
              <p className='contact-title'>OUR STORE</p>
              <p className='contact-paragraph'>54709 Willims Station</p>
              <p>Suite 350,Washington ,USA</p>
              <p className='contact-paragraph'>Tel:(415)555-0132</p>
              <p >Email:tset@gmail.com</p>
              <p className='contact-title'> CAREERS AT FOREVER</p>
              <p className='contact-paragraph'>learn more about teams and job openings</p>
              <button>Explore Jobs</button>
          </div>
        </div>

    </div>
  )
}

export default Contact