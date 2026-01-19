import { useState } from 'react'
import './Orders.css'
import axios from "axios"
import {backendUrl} from '../../App'
import { toast } from 'react-toastify';

import React from 'react'
import { useEffect } from 'react'
import { assets } from '../../assets/assets';

const Orders = ({token}) => {

  const [orders,setOrders] = useState([])

  const fetchOrders = async () =>{
    if (!token) {
      return null
    }

    try {
      const response = await axios.post(backendUrl+'/api/order/list',{},{headers:{token}})
      
      if (response.data.success) {
        setOrders(response.data.orders)
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  //status update
  const statusHandler = async (event,orderId) =>{
    try {
      const response = await axios.post(backendUrl + '/api/order/status',{orderId,status:event.target.value},{headers:{token}})
      if (response.data.success) {
        await fetchOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }

  useEffect(()=>{
    fetchOrders();
  },[token])

  return (
    <div className="order-container">
        <h3>Order Page</h3>
        <div >
            {
              orders.map((order,index)=>(
                 <div key={index}className='order-box' > 
                 <img className='order-box-img' src={assets.parcel_icon} alt="" />
                 <div className='order-details'>
                    {order.items.map((item,index) =>{
                      if (index === order.items.length -1) {
                        return <p className='details' key={index} >{item.name} X {item.quantity} <span>{item.size}</span></p>
                      }
                      else{
                        return <p className='details' key={index} >{item.name} X {item.quantity} <span>{item.size}</span></p>
                      }
                    })}
                 
                    <p>{order.address.firstName +" "+ order.address.lastName}</p>
                    <div className="address">
                      <p>{order.address.street+",  "}</p>
                      <p>{order.address.city +", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                    </div>
                 
                    <p>{order.address.phone}</p>
                     </div>
                    <div className="payment">
                    <p>Items :{order.items.length}</p>
                    <p>Method:{order.paymentMethod}</p>
                    <p>Payment:{order.payment ?'Done' :'pending'}</p>
                    <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <p className='payment-price'>${order.amount}</p>
                    <select  onChange={(event) => statusHandler(event,order._id)} value={order.status} id="payment-select">
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out For Delivery">Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                 </div>
                 
              ))
            }
        </div>
    </div>
  )
}

export default Orders