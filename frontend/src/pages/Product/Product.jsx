import { useParams } from 'react-router-dom'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'
import { StoreContext } from '../../context/StoreContext'
import './Product.css'

import React, { useContext, useEffect, useState } from 'react'
import Description from '../../components/Description/Description'
import RelatedProduct from '../../components/RelatedProduct/RelatedProduct'

const Product = () => {
    
  return (
    <div>
        
        
        <ProductDisplay />
        
        
    </div>
  )
}

export default Product