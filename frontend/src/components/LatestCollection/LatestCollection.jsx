
import { StoreContext } from '../../context/StoreContext'
import './LatestCollection.css'
import React, { useContext, useEffect, useState } from 'react'
import Item from '../Item/Item'
const LatestCollection = () => {

    const {products} =useContext(StoreContext)
    const [latestCollection,setLatestCollection] =useState([]);
    //data load file in assests.js
        useEffect(()=>{
            setLatestCollection(products.slice(0,10));
        },[products])
 
    
    
  return (

    

    <div className='latest-collection'>
        <div className="latest-collection-title">
            <h2><span>LATEST </span>COLLECTIONS</h2>
            <p></p>
        </div>
        <p className='latest-collection-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, reprehenderit!</p>
        <div className="latest-collection-image">
              {latestCollection.map((item,i)=>{
                 return <Item  key={i} id={item._id} image={item.image} name={item.name} price={item.price}/>
              })}   
        </div>

    </div>
  )
}

export default LatestCollection