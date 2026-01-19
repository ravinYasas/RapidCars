import axios from 'axios'
import { StoreContext } from '../../context/StoreContext.jsx'
import './MyOrders.css'


import React, { useContext, useEffect, useState } from 'react'

const MyOrders = () => {
  const {backendUrl,token} =useContext(StoreContext)
  const [orderdata,setorderData] =useState([]);
  const [loading,setLoading] = useState(false);

  const fetchOrders = async ()=>{
    setLoading(true)
    try {
      const response = await axios.post(backendUrl+"/api/order/userorders",{},{headers:{token}})
      if (response.data.success) {
        let allOrderItem =[]
        response.data.data.map((order)=>{
          order.items.map((item)=>{
              item['status'] =order.status
              item['payment']=order.payment
              item['date'] =order.date
              item['depositReference'] = order.depositReference
              item['depositAmount'] = order.depositAmount
              allOrderItem.push(item)
          })
        })
        setorderData(allOrderItem.reverse())
      }
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
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
        {loading && <p className='muted'>Loading your orders...</p>}
        {!loading && orderdata.length===0 && <p className='muted'>No orders yet. Add a vehicle to your pre-order cart to get started.</p>}
        <div className="orders">
          {
            orderdata.map((item,index)=>(
              <div key={index} className="order-box">
                <div className="order-item">
                <img src={item.image?.[0]} alt="" />
                </div>
                <div className="order-name">
                    <p className='vehicle-name'>{item.name}</p>
                    <div className="order-price">
                        <p className='label'>Estimated up to</p>
                        <p className='value'>LKR {item.price?.toLocaleString?.()}</p>
                    </div>
                    <p>Deposit: <span className='order-price-span'>LKR {(item.depositRequired || 50000).toLocaleString?.()}</span></p>
                    <p>Quantity: <span className='order-price-span'>{item.quantity}</span></p>
                    <p>Date: <span className='order-price-span' >{new Date(item.date).toDateString()}</span></p>
                    {item.depositReference && <p>Deposit Reference: <span className='order-price-span'>{item.depositReference}</span></p>}
                    {item.depositAmount && <p>Total Deposit Charged: <span className='order-price-span'>LKR {item.depositAmount?.toLocaleString?.()}</span></p>}
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