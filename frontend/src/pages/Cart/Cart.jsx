import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import CartTotal from '../../components/CartTotal/CartTotal'
import { StoreContext } from '../../context/StoreContext.jsx'
import './Cart.css'

import React, { useContext, useEffect } from 'react'

const Cart = () => {
 const navigate = useNavigate();
  const {cartItem,sizes,cartData,setCartData,products,removeFromCart,updateQuantity} =useContext(StoreContext)

  useEffect(()=>{
    if (products.length>0) {
      const tempData= [];
      for(const items in cartItem){
        for(const item in cartItem[items]){
            if (cartItem[items][item]>0) {
              tempData.push({
                _id:items,
                sizes:item,
                quantity:cartItem[items][item]
              })
            }
        }
      }
      setCartData(tempData)
    }
  },[cartItem,products])


  return (
    <div className='cart'>

      <div className="cart-topic">
        <p>Cart <span>Item</span></p>
        <p className='item-bar'></p>
      </div>

        <div className="cart-items">
            
            {
             cartData.map((item,index)=>{
                const cartData = products.find((product)=>product._id === item._id)
                if (cartItem[item._id]) {
                  
                
                return(
                  <div>
                    <div className="cart-items-item">
                        <img src={cartData.image[0]} alt=""  />
                        <div className="product-name">
                        <p>{cartData.name}</p>
                          <div className='product details'>
                          <p>${cartData.price}</p>
                          <p className='sizes'>{item.sizes}</p>
                          </div>        
                           </div>                                          
                        <input onChange={(e)=>e.target.value === '' ||e.target.value ==='0'?null:updateQuantity(item._id,item.sizes,Number(e.target.value))}
                         className='input-quantity' type="number" defaultValue={item.quantity} />
                        <img onClick={()=>updateQuantity(item._id,item.sizes,0)} className='bin' src={assets.bin_icon} alt="" />
                        
                    </div>
                    <hr  className='bar'/>
                  </div>
                )
              }
             })
            }
            
        </div>
        <CartTotal/>
        <hr />
        <div className="coupen">
            <div className="add-coupen">
                <input type="text" />
                <button>ADD Coupen</button>
            </div>
            <button onClick={()=>navigate('/checkout')} className='checkouts'>Checkout</button>
        </div>
    </div>
  )
}

export default Cart