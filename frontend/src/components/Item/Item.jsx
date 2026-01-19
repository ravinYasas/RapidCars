import './Item.css'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const Item = ({id,name,price,description,category,subCategory,sizes,date,image}) => {
 
 
  const {url} = useContext(StoreContext);

  return (
    <div className='item'>

      <Link to={`/product/${id}`}><img src={image[0]} alt="" /></Link>
        
        <p>{name}</p>
        <p>{description}</p>
        <p>${price}</p>
        <p>{category}</p>
        <p>{subCategory}</p>
        <p>{sizes}</p>
        <p>{date}</p>
        
    </div>
  )
}

export default Item