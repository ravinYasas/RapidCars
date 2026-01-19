import './ProductDisplay.css'
import {useParams} from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import RelatedProduct from '../RelatedProduct/RelatedProduct'
import Description from '../Description/Description'

const ProductDisplay = () => {
  const {products,productData,setProductData,addToCart} = useContext(StoreContext)
    const {productId} =useParams();
    
    const [image,setImage]=useState([])
    const [selectedImage,setSelectedImage] = useState('')
    
    

    const fetchProductData = async ()=>{
        products.map((item)=>{
          if (item._id===productId) {
            setProductData(item)
            setImage(item.image || [])
            setSelectedImage(item.image?.[0] || '')
            
            return null;
            
          }
        })
    }
    
    useEffect(()=>{
      fetchProductData();
    },[productId,products])
  return productData? (
    <div className='container'>
      <div className="productdata">
          <div className="product-image">
              <div className="side-img">
                {image?.slice(0,4)?.map((img,i)=>(
                  <img
                    key={`${img}-${i}`}
                    src={img}
                    alt="Vehicle thumbnail"
                    className={img===selectedImage ? 'active' : ''}
                    onClick={()=>setSelectedImage(img)}
                  />
                ))}
              </div>
              <div className="main-image">
                 {(selectedImage || image?.[0]) && <img src={selectedImage || image[0]} alt="Selected vehicle" />}
              </div>
          </div>
          <div className="product-details">
              <h1>{productData.make} {productData.model} {productData.year}</h1>
              <p className='product-meta'>Chassis: {productData.chassisCode} • Grade: {productData.grade || '—'} • {productData.transmission}</p>
              <p className='product-meta'>Fuel: {productData.fuel || '—'} • Mileage: {productData.mileage?.toLocaleString?.()} km</p>
              <p>{productData.description}</p>
              <p className='price'>Estimated up to LKR {productData.startingPrice?.toLocaleString?.()}</p>
              <p className='deposit-note'>Deposit required: LKR {productData.depositRequired?.toLocaleString?.()} to proceed with the import process.</p>
              <div className="contact-block">
                <p className="contact-text">Questions about this vehicle? Message us on WhatsApp.</p>
                <a className="contact-button" href="https://wa.me/94775905443" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
              </div>
              <button onClick={()=>addToCart(productData._id)} className="add-to-cart">ADD TO PRE-ORDER CART</button>
              <div className="product-details-detail">
                  <p>Includes original Japanese auction sheet.</p>
                  <p>We convert navigation to English before handover.</p>
                  <p>Guided walkthrough of all features at delivery.</p>
              </div>
          </div>
      </div>
     <Description/>
      <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ):
  <div></div>
  
}

export default ProductDisplay