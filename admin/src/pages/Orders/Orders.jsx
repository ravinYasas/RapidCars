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
  const [loading,setLoading] = useState(false)

  const fetchOrders = async () =>{
    if (!token) {
      return null
    }

    try {
      setLoading(true)
      const response = await axios.post(backendUrl+'/api/order/list',{},{headers:{token}})
      
      if (response.data.success) {
        setOrders(response.data.orders)
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
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
        <h3>Orders</h3>
        {loading && <p className='muted'>Loading orders...</p>}
        {!loading && orders.length === 0 && <p className='muted'>No orders yet.</p>}
        <div className='orders-grid'>
            {
              orders.map((order,index)=>(
                 <div key={index}className='order-box' > 
                   <div className='order-header'>
                     <div className='order-id'>
                        <img className='order-box-img' src={assets.parcel_icon} alt="" />
                        <div>
                          <p className='label'>Order</p>
                          <p className='value'>{order._id}</p>
                        </div>
                     </div>
                     <div className='order-status'>
                        <select  onChange={(event) => statusHandler(event,order._id)} value={order.status} id="payment-select">
                            <option value="Awaiting Deposit">Awaiting Deposit</option>
                            <option value="Processing Import">Processing Import</option>
                            <option value="On Vessel">On Vessel</option>
                            <option value="Arrived Hambantota">Arrived Hambantota</option>
                            <option value="Ready for Handover">Ready for Handover</option>
                            <option value="Completed">Completed</option>
                        </select>
                     </div>
                   </div>
                 <div className='order-details'>
                    {order.items.map((item,index) =>{
                        const title = item.make ? `${item.make} ${item.model || ''} ${item.year || ''}`.trim() : item.name;
                        return (
                          <p className='details' key={index} >{title} × {item.quantity} <span>Deposit LKR {(item.depositRequired || 50000).toLocaleString?.()}</span></p>
                        )
                    })}
                 
                    <div className="address-block">
                      <p className='label'>Customer</p>
                      <p className='value'>{order.address.firstName +" "+ order.address.lastName}</p>
                      <p className='value'>{order.address.phone}</p>
                      <p className='value'>{order.address.street}</p>
                      <p className='value'>{order.address.city +", "+order.address.state+", "+order.address.country+" "+order.address.zipcode}</p>
                    </div>
                 
                     </div>
                    <div className="payment">
                    <p>Items: <span className='value'>{order.items.length}</span></p>
                    <p>Payment: <span className='value'>{order.payment ?'Done' :'Pending'}</span></p>
                    {order.depositReference && <p>Deposit Ref: <span className='value'>{order.depositReference}</span></p>}
                    {order.depositAmount && <p>Deposit Amount: <span className='value'>LKR {order.depositAmount?.toLocaleString?.()}</span></p>}
                    <p>Date: <span className='value'>{new Date(order.date).toLocaleDateString()}</span></p>
                    </div>
                    <p className='payment-price'>LKR {order.amount?.toLocaleString?.()}</p>
                 </div>
                 
              ))
            }
        </div>
    </div>
  )
}

export default Orders