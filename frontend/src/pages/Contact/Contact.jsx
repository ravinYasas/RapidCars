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
              <p className='contact-title'>RAPID CARS IMPORT HUB</p>
              <p className='contact-paragraph'>Colombo service desk • Japan sourcing office</p>
              <p>Phone: +94 71 000 0000</p>
              <p className='contact-paragraph'>Email: hello@rapidcars.com</p>
              <p className='contact-title'>READY TO PRE-ORDER?</p>
              <p className='contact-paragraph'>Share your preferred make, model, year, and budget to receive live auction options.</p>
              <button>Start A Pre-order</button>
          </div>
        </div>

    </div>
  )
}

export default Contact