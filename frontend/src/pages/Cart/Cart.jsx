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

      <div className="cart-topic">
        <p>Cart <span>Item</span></p>
        <p className='item-bar'></p>
      </div>

        <div className="cart-items">
            
            {derivedCart.map((item)=>{
              const productInfo = products.find((product)=>product._id === item._id);
              if (!productInfo) return null;
              return(
                <div key={`${item._id}-${item.sizes}`}>
                  <div className="cart-items-item">
                      <img src={productInfo.image[0]} alt=""  />
                      <div className="product-name">
                      <p>{productInfo.name}</p>
                        <div className='product details'>
                        <p>${productInfo.price}</p>
                        <p className='sizes'>{item.sizes}</p>
                        </div>        
                         </div>                                          
                      <img onClick={()=>removeFromCart(item._id,item.sizes)} className='bin' src={assets.bin_icon} alt="" />
                      
                  </div>
                  <hr  className='bar'/>
                </div>
              )
            })}
            
        </div>
        <CartTotal/>
        <hr />
        <div className="checkout-actions">
          <button onClick={()=>navigate('/checkout')} className='checkouts'>Checkout</button>
        </div>
    </div>
  )
}

export default Cart