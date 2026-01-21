
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
            <p>Latest <span>Collection</span></p>
            <p className="latest-collection-bar"></p>
        </div>
        <p className='latest-collection-text'>Fresh arrivals direct from Japan auctions with verified sheets and landed cost guidance.</p>
        <div className="latest-collection-image">
              {latestCollection.map((item,i)=>{
                      return <Item  key={i} id={item._id} image={item.image} make={item.make} model={item.model} year={item.year} startingPrice={item.startingPrice} grade={item.grade} mileage={item.mileage} transmission={item.transmission} fuel={item.fuel}/>
              })}   
        </div>

    </div>
  )
}

export default LatestCollection