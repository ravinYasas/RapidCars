import './Subcribe.css'

import React from 'react'

const Subcribe = () => {

    const onSubmitHandler =(event)=>{
      event.preventDefault();
    }

  return (
    <div className='subcribe-container'>
        <h2>Subcribe Now & get 20% off</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, ex.</p>
        <div className="subcribe-box" onSubmit={onSubmitHandler} >
            <input type="email" />
            <button>SUBCRIBE</button>
        </div>
    </div>
  )
}

export default Subcribe