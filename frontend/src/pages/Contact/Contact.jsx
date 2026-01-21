import {assets} from '../../assets/assets'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const navigate = useNavigate()
  return (
    <div className='app-shell py-10 sm:py-14 lg:py-16'>
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">CONTACT <span className="text-accent">US</span></h2>
          <span className="h-0.5 w-10 bg-muted/60 rounded-full" aria-hidden="true"></span>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 items-center bg-white/80 rounded-2xl border border-border/70 shadow-soft p-6 sm:p-8 lg:p-10">
          <img className="w-full max-w-xl mx-auto object-contain" src={assets.contact_img} alt="Contact Rapid Cars" />

          <div className="space-y-4 text-base sm:text-lg text-muted">
              <p className='text-lg sm:text-xl font-semibold text-ink'>RAPID CARS IMPORT HUB</p>
              <p className='text-muted'>Visit us now. Veyangoda, Gampaha Sri Lanka</p>
              <p>Phone: <a className="text-accent hover:text-accentDark font-semibold" href="https://wa.me/94775905443?text=Hi%2C%20I%27m%20interested%20in%20pre-ordering%20a%20vehicle" target="_blank" rel="noopener noreferrer">+94 77 590 5443</a></p>
              <p className='text-muted'>Email: <a className="text-accent hover:text-accentDark font-semibold" href="mailto:subasingheravindu@gmail.com">subasingheravindu@gmail.com</a></p>
              <p className='text-lg sm:text-xl font-semibold text-ink pt-2'>READY TO PRE-ORDER?</p>
              <p className='text-muted'>Share your preferred make, model, year, and budget to receive live auction options.</p>
              <button onClick={()=>navigate('/collection')} className='inline-flex items-center justify-center rounded-xl bg-ink text-white px-5 py-3 text-sm sm:text-base font-semibold shadow-soft hover:bg-ink/90 transition-colors'>Start A Pre-order</button>
          </div>
        </div>

    </div>
  )
}

export default Contact