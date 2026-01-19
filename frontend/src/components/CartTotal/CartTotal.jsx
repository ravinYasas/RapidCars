import { StoreContext } from '../../context/StoreContext'
import './CartTotal.css'

import React, { useContext } from 'react'

const CartTotal = () => {

    const {getCartAmount} = useContext(StoreContext);
    

  return (
    <div className='cartData'>
        <div className="cart-topic-text">
            <p>Cart <span>Total</span></p>
            <p className="item-bar"></p>
        </div>
        <div className="cart-payment">
        <div className="total">
            <p>SubTotal</p>
            <p>LKR {getCartAmount()}</p>
        </div>
        <div className="total">
            <p>Shipping / Delivery</p>
            <p className='shiping'>LKR 0 (vehicle shipping charged separately)</p>
        </div>
        <div className="total">
            <b>Total</b>
            <b className='total-amount'>LKR {getCartAmount()}</b>
        </div>
        <p className="delivery-note">If you wish, we can deliver your car to your doorstep when the shipment arrives; handover typically within 2 months.</p>
        </div>
    </div>
  )
}

export default CartTotal