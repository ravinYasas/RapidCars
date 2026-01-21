import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import CartTotal from '../../components/CartTotal/CartTotal'
import { StoreContext } from '../../context/StoreContext.jsx'
import './Cart.css'

import React, { useContext, useMemo } from 'react'

const Cart = () => {
 const navigate = useNavigate();
  const {cartItem,products,removeFromCart} =useContext(StoreContext)

  const derivedCart = useMemo(()=>{
    if (!products.length) return [];
    const tempData = [];
    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        if (cartItem[itemId][size] > 0) {
          tempData.push({ _id:itemId, sizes:size });
        }
      }
    }
    return tempData;
  },[cartItem,products])


  return (
    <div className='cart'>
      <div className="cart-hero">
        <div>
          <p className="cart-title">Your Cart</p>
          <p className="cart-subtitle">Review vehicles and selections before you checkout.</p>
        </div>
        <button className="ghost-btn" onClick={()=>navigate('/collection')}>Browse More Cars</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {derivedCart.length === 0 && (
            <div className="cart-empty">
              <img src={assets.cart_icon} alt="Empty cart" />
              <div>
                <p className="empty-title">Your cart is empty</p>
                <p className="empty-subtitle">Add a few cars to reserve your spot.</p>
              </div>
              <button onClick={()=>navigate('/collection')} className="primary-btn">Browse cars</button>
            </div>
          )}

          {derivedCart.map((item)=>{
            const productInfo = products.find((product)=>product._id === item._id);
            if (!productInfo) return null;
            return(
              <div key={`${item._id}-${item.sizes}`} className="cart-card">
                <div className="cart-card-main">
                  <img src={productInfo.image[0]} alt={productInfo.name} className="cart-card-img" />
                  <div className="cart-card-info">
                    <p className="cart-card-name">{productInfo.make || ''} {productInfo.model || ''} {productInfo.year || ''}</p>
                    <p className="cart-card-meta">LKR {productInfo.price?.toLocaleString?.()} • Option {item.sizes}</p>
                    <p className="cart-card-meta subtle">Grade {productInfo.grade || '—'} • {productInfo.transmission || '—'} • {productInfo.fuel || '—'}</p>
                    <p className="cart-card-meta subtle">Chassis {productInfo.chassisCode || '—'} • Mileage {productInfo.mileage ? `${productInfo.mileage.toLocaleString()} km` : '—'}</p>
                  </div>
                </div>
                <button onClick={()=>removeFromCart(item._id,item.sizes)} className="icon-btn" aria-label="Remove item">
                  <img src={assets.bin_icon} alt="Remove" />
                </button>
              </div>
            )
          })}
        </div>

        <div className="cart-summary">
          <CartTotal/>
          <button onClick={()=>navigate('/checkout')} className='primary-btn full-width'>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart