import axios from 'axios'
import { StoreContext } from '../../context/StoreContext.jsx'
import './MyOrders.css'


import React, { useContext, useEffect, useMemo, useState } from 'react'

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

  const renderStatus = (status)=>{
    if (!status) return 'Pending';
    return status;
  }

  return (
    <div className='orders-page'>
      <div className="orders-hero">
        <div>
          <p className="orders-title">My Orders</p>
          <p className="orders-subtitle">Track your vehicle pre-orders, deposits, and delivery progress.</p>
        </div>
        <button className="ghost-btn" onClick={fetchOrders} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {loading && <p className='muted'>Loading your orders...</p>}
      {!loading && orderdata.length===0 && (
        <div className="orders-empty">
          <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f697.svg" alt="Car" />
          <div>
            <p className="empty-title">No orders yet</p>
            <p className="empty-subtitle">Add a vehicle to your pre-order cart to get started.</p>
          </div>
          <a href="/collection" className="primary-link">Browse vehicles</a>
        </div>
      )}

      <div className="orders-grid">
        {orderdata.map((item,index)=>{
          const price = item.price?.toLocaleString?.('en-LK');
          const depositRequired = (item.depositRequired || 50000)?.toLocaleString?.('en-LK');
          const depositAmount = item.depositAmount?.toLocaleString?.('en-LK');
          const dateStr = item.date ? new Date(item.date).toDateString() : '—';
          const name = item.make || item.model ? `${item.make || ''} ${item.model || ''} ${item.year || ''}`.trim() : item.name;

          return (
            <div key={index} className="order-card">
              <div className="order-card-main">
                <img src={item.image?.[0]} alt={name} className="order-img" />
                <div className="order-info">
                  <p className="vehicle-name">{name || 'Vehicle'}</p>
                  <p className="order-meta">Chassis {item.chassisCode || '—'} • Grade {item.grade || '—'} • {item.transmission || '—'}</p>
                  <p className="order-meta subtle">Fuel {item.fuel || '—'} • Mileage {item.mileage ? `${item.mileage.toLocaleString()} km` : '—'}</p>
                  <div className="order-tags">
                    <span className="tag">Est. LKR {price || '—'}</span>
                    <span className="tag muted">Deposit LKR {depositRequired || '—'}</span>
                    <span className="tag muted">Qty {item.quantity}</span>
                  </div>
                  <div className="order-foot">
                    <span className="muted">Placed: {dateStr}</span>
                    {item.depositReference && <span className="muted">Ref: {item.depositReference}</span>}
                    {depositAmount && <span className="muted">Paid: LKR {depositAmount}</span>}
                  </div>
                </div>
              </div>
              <div className="order-card-actions">
                <span className={`status-pill ${renderStatus(item.status).toLowerCase().replace(/\s+/g,'-')}`}>{renderStatus(item.status)}</span>
                <button className='track-order'>Track Order</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders