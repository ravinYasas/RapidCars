import axios from 'axios'
import { StoreContext } from '../../context/StoreContext.jsx'
import './MyOrders.css'


import React, { useContext, useEffect, useState } from 'react'

const MyOrders = () => {
  const {backendUrl,token} =useContext(StoreContext)
  const [orderdata,setorderData] =useState([]);

  const fetchOrders = async ()=>{
     const response = await axios.post(backendUrl+"/api/order/userorders",{},{headers:{token}})
     
     if (response.data.success) {
        let allOrderItem =[]
        response.data.data.map((order)=>{
          order.items.map((item)=>{
              item['status'] =order.status //this item get in response data in orders
              item['payment']=order.payment
              item['paymentMethod'] =order.paymentMethod
              item['date'] =order.date
              allOrderItem.push(item)
          })
        })
        setorderData(allOrderItem.reverse())
        
        
     }
      
  }

  useEffect(()=>{
    if (token) {
      fetchOrders()
    }
  },[token])
  return (
    <div className='order-container'>
      <div className="cart-topic">
      <div>My <span>Orders</span></div>
      <p className='item-bar'></p>
      </div>
        
        <div className="orders">
          {
            orderdata.map((item,index)=>(
              <div key={index} className="order-box">
                <div className="order-item">
                <img src={item.image[0]} alt="" />
                </div>
                <div className="order-name">
                    <p>{item.name}</p>
                    <div className="order-price">
                        <p>${item.price}</p>
                        <p>Quantity:{item.quantity}</p>
                        <p>Size:{item.size}</p>
                    </div>
                    <p>Date: <span className='order-price-span' >{new Date(item.date).toDateString()}</span></p>
                    <p>Payment Type: <span className='order-price-span'>{item.paymentMethod}</span></p>
                </div>
                <div className="orders-status">
                  <p className="dot"></p>
                <p>{item.status}</p>
                </div>
                <button className='track-order'>Track Order</button>
              </div> 
              ))
          }
        </div>
    </div>
  )
}

export default MyOrders