import './Contact.css'
import {assets} from '../../assets/assets'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const navigate = useNavigate()
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
              <p className='contact-paragraph'>Visit us now. Veyangoda,Gampaha Sri Lanka</p>
              <p>Phone: +94 77 590 5443</p>
              <p className='contact-paragraph'>Email: hello@rapidcars.com</p>
              <p className='contact-title'>READY TO PRE-ORDER?</p>
              <p className='contact-paragraph'>Share your preferred make, model, year, and budget to receive live auction options.</p>
              <button onClick={()=>navigate('/collection')}>Start A Pre-order</button>
          </div>
        </div>

    </div>
  )
}

export default Contact