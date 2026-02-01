import {assets} from '../../assets/assets'
import preOrderGuide from './Direct Vehicle Import Process.pdf'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <>
    <footer className="bg-white/90 backdrop-blur text-muted border-t border-border/70">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-70" aria-hidden="true">
          <div className="absolute -left-10 -top-24 h-48 w-48 rounded-full bg-accent/10 blur-2xl"></div>
          <div className="absolute right-0 top-10 h-40 w-40 rounded-full bg-ink/5 blur-2xl"></div>
        </div>

        <div className="app-shell py-14 flex flex-col gap-12 relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <img className="h-10 w-auto" src={assets.logo} alt="Rapid Cars logo" />
              <p className="text-sm font-semibold text-ink tracking-wide">Japan Direct • Transparent Imports</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-4 py-2 text-sm font-semibold shadow-soft hover:bg-ink/90 transition-colors" href="https://wa.me/94775905443?text=Hi%2C%20I%27m%20interested%20in%20pre-ordering%20a%20vehicle" target="_blank" rel="noopener noreferrer">WhatsApp us</a>
              <a className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink hover:border-ink/30 transition-colors" href="mailto:subasingheravindu@gmail.com">Email support</a>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              <p className="text-base leading-relaxed text-slate-600">Rapid Cars delivers direct vehicle imports from Japan with full transparency. We guide you from auction sheet to handover with clear pricing, LC in your name, and every feature explained so you can drive away with confidence.</p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-ink tracking-wide">COMPANY</h2>
              <ul className="space-y-2 text-base">
                <li>
                  <Link className="hover:text-ink transition-colors" to="/">Home</Link>
                </li>
                <li>
                  <Link className="hover:text-ink transition-colors" to="/about">About Rapid Cars</Link>
                </li>
                <li>
                  <a className="hover:text-ink transition-colors" href={preOrderGuide} target="_blank" rel="noopener noreferrer">Pre-order Guide</a>
                </li>
                <li className="hover:text-ink transition-colors cursor-pointer">Transparency Policy</li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-ink tracking-wide">GET IN TOUCH</h2>
              <ul className="space-y-2 text-base">
                <li><a className="hover:text-ink transition-colors" href="https://wa.me/94775905443?text=Hi%2C%20I%27m%20interested%20in%20pre-ordering%20a%20vehicle" target="_blank" rel="noopener noreferrer">WhatsApp: +94 77 590 5443</a></li>
                <li><a className="hover:text-ink transition-colors" href="mailto:subasingheravindu@gmail.com">subasingheravindu@gmail.com</a></li>
                <li className="text-slate-600">No.48/E Wataddara, Veyangoda, Gampaha, Sri Lanka</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="h-px flex-1 bg-border"></div>
            <p>Rapid Cars © 2026 — All rights reserved</p>
            <div className="h-px flex-1 bg-border"></div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
  
}

export default Footer