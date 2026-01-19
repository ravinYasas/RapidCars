import './Item.css'
import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({id,make,model,year,startingPrice,image,grade,mileage,transmission,fuel}) => {
  return (
    <div className='item'>
      <Link to={`/product/${id}`}><img src={image?.[0]} alt={`${make} ${model}`} /></Link>
      <p className='item-title'>{make} {model} {year}</p>
      <p className='item-meta'>{grade} • {transmission} • {fuel}</p>
      {mileage ? <p className='item-meta'>Mileage: {mileage.toLocaleString()} km</p>: null}
      <p className='item-price'>Estimated up to LKR {startingPrice?.toLocaleString?.()}</p>
    </div>
  )
}

export default Item