import { StoreContext } from '../../context/StoreContext'
import './CartTotal.css'

import React, { useContext } from 'react'

const CartTotal = () => {

    const {getCartAmount,delivery_fee} = useContext(StoreContext);
    

  return (
    <div className='cartData'>
        <div className="cart-topic-text">
            <p>Cart <span>Total</span></p>
            <p className="item-bar"></p>
        </div>
        <div className="cart-payment">
        <div className="total">
            <p>SubTotal</p>
            <p>${getCartAmount()}.00</p>
        </div>
        <div className="total">
            <p>Shipping Fee</p>
            <p className='shiping'> ${delivery_fee}</p>
        </div>
        <div className="total">
            <b>Total</b>
            <b className='total-amount'>${getCartAmount() ===0?0:getCartAmount() + delivery_fee}.00</b>
        </div>
        </div>
    </div>
  )
}

export default CartTotal