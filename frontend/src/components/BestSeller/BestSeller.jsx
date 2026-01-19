import { StoreContext } from '../../context/StoreContext'
import Item from '../Item/Item';
import './BestSeller.css'

import React, { useContext, useEffect, useState } from 'react'

  

const BestSeller = () => {

    const {products} =useContext(StoreContext);
    const [bestSELLER,setBestSeller] =useState([]);

    //load data in file
    useEffect(()=>{
      
        setBestSeller(products.slice(0,5));
    },[products])

  return (
    <div className='bestSeller'>
         <div className="bestSeller-topic">
            <p>Best <span>Seller</span> </p>
            <p className='bestSeller-bar'></p>
            </div>
          <p className='bestSeller-text'>Customer-favorite imports with clear option breakdowns and ready-for-delivery conversions.</p>
         
         <div className="bestSeller-container">
            {bestSELLER.map((item,i)=>{
              return <Item key={i} id={item._id} image={item.image} make={item.make} model={item.model} year={item.year} startingPrice={item.startingPrice} grade={item.grade} mileage={item.mileage} transmission={item.transmission} fuel={item.fuel}/>
            })}
             
         </div>
    </div>
  )
}

export default BestSeller