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
            <p className='bestSeller-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, laboriosam.</p>
         
         <div className="bestSeller-container">
            {bestSELLER.map((item,i)=>{
                return <Item key={i} id={item._id} image={item.image} name={item.name}
                price={item.price}/>
            })}
             
         </div>
    </div>
  )
}

export default BestSeller