import './Subcribe.css'

import React from 'react'

const Subcribe = () => {

    const onSubmitHandler =(event)=>{
      event.preventDefault();
    }

  return (
    <div className='subcribe-container'>
        <h2>Get auction alerts and landing costs</h2>
        <p>Be first to see Japan auction picks, price breakdowns, and handover timelines.</p>
        <div className="subcribe-box" onSubmit={onSubmitHandler} >
            <input type="email" />
            <button>SUBSCRIBE</button>
        </div>
    </div>
  )
}

export default Subcribe