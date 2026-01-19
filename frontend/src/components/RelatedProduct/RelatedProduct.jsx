import { StoreContext } from '../../context/StoreContext'
import Item from '../Item/Item'
import './RelatedProduct.css'

import React, { useContext, useEffect, useState } from 'react'

const RelatedProduct = ({category,subCategory}) => {

    const {products} =useContext(StoreContext)
    const [related,setRelated] =useState([]);

    
    useEffect(() => {
    if (products.length>0) {
        let productCopy = products.slice();

        productCopy =productCopy.filter((item)=>category===item.category);
        productCopy=productCopy.filter((item)=> subCategory===item.subCategory)

        setRelated(productCopy.slice(0,5));
        
    }
    }, [products, category, subCategory]);
    
    

  return (
    <div className='related-products'>
            <div className="topic">
                <p>Related <span>Products</span></p>
                <p className="related-bar"></p>
            </div>
            <div className="product-details-item">
                {related.map((item,i)=>(
                    <Item key={i} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
    </div>
  )
}

export default RelatedProduct