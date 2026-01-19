import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import CartTotal from '../../components/CartTotal/CartTotal.jsx'
import { StoreContext } from '../../context/StoreContext.jsx';


import './Checkout.css'

import React, { useContext, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';



const Checkout = () => {
    const { backendUrl,token,cartItem,setCartAmount,setCartItems,products,getCartAmount,delivery_fee } = useContext(StoreContext) 
    const navigate =useNavigate();
    const [method ,setMethod] = useState('cod');

    const [formData,setFormData] =useState({
        firstName:'',
        lastName:"",
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:''
    })

    const onChangeHandler =  (event) =>{
        const name = event.target.name
        const value = event.target.value

        setFormData(data =>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event)=>{
            event.preventDefault()
            try {
                let orderItems =[]

                for(const items in cartItem){
                    for(const item in cartItem[items]){
                        if (cartItem[items][item]>0) {
                            const itemInfo = structuredClone(products.find(product=>product._id ===items))
                            if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItem[items][item]
                            orderItems.push(itemInfo)
                        }
                        }
                    }
                }

                let orderData ={
                    address:formData,
                    items:orderItems,
                    amount:getCartAmount() +delivery_fee
                }
                
                switch (method) {
                    case 'cod':
                        const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                       
                       
                        if (response.data.success) {
                            setCartItems({})
                            navigate('/myorders')
                            toast.success(response.data.message)
                        } else {
                            toast.error(response.data.message  )
                        }

                        break;
                    
                    case 'stripe':
                        const responseStripe = await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{token}})
                        if (responseStripe.data.success) {
                            const {session_url} =responseStripe.data
                            window.location.replace(session_url)
                            toast.success(response.data.message)
                        }else{
                            toast.error(responseStripe.data.message)
                        }

                        break;
                    default:
                        break;
                }
                
            } catch (error) {
                
            }
    }

  return (
  <form onSubmit={onSubmitHandler}>
    <div>
        <div className="checkout-title">
     <p>CHECKOUT <span>PAYMENT</span></p>
     <p className='item-bar'></p>
        </div>
     <div className='checkout'>
        
        <div className="cart-left">
            <div className="cart-name">
                <input id='input-fields' name='firstName'  onChange={onChangeHandler} value={formData.firstName} className='cart-name-topic' type="text" placeholder='First Name' required />
                <input id='input-fields' name='lastName' onChange={onChangeHandler} value={formData.lastName} className='cart-name-topic' type="text" placeholder='Last Name' required />
            </div>
            <input id='input-fields' name='email' onChange={onChangeHandler} value={formData.email} className='cart-personal'type="email" placeholder='Email'  required />
            <input id='input-fields' name='phone' onChange={onChangeHandler} value={formData.phone} className='cart-personal' type="number" maxLength='10' placeholder='Number' required />
            <div className="cart-address">
                <input onChange={onChangeHandler} name='street' value={formData.street} className='cart-personal' type="text" placeholder='Street Address' required />
                <div className="cart-address">
                    <input id='input-fields' name='city' onChange={onChangeHandler} value={formData.city} className='cart-name-topic'  type="text" placeholder='Town' required />
                    <input id='input-fields' name='state' onChange={onChangeHandler} value={formData.state} className='cart-name-topic' type="text" placeholder='State' required/>
                </div>
                <div className="country">
                    <input id='input-fields' name='country' onChange={onChangeHandler} value={formData.country} className='cart-name-topic' type="text" placeholder='Country' required />
                    <input id='input-fields' name='zipcode' onChange={onChangeHandler} value={formData.zipcode} className='cart-name-topic' type="text" placeholder='Zip Code'  required/>
                </div>
            </div>
        </div>
        
        <div className="cart-right">
              <CartTotal/>
            <div className="payment-type">
                <div onClick={()=>setMethod('stripe')} className="stripe">
                    <p className={`${method === 'stripe'?'select':''}`} > </p>
                    <img className='border' src={assets.stripe_logo} alt=""  />
                    <p className={`${method === 'stripe'?'select':''}`} > </p>
                </div>
                <div onClick={()=>setMethod('razorpay')} className="razorpay">
                    <p className={`${method === 'razorpay'?'select':''}`}></p>
                    <img className='border' src={assets.razorpay_logo} alt="" />
                    <p className={`${method === 'razorpay'?'select':''}`} > </p>
                </div>
                <div onClick={()=>setMethod('cod')} className="cod">
                    <p className={`${method === 'cod'?'select':''}`}></p>
                    <p className='border'>Cash ON DELIVERY</p>
                    <p className={`${method === 'cod'?'select':''}`} > </p>
                </div>
            </div>
      
        <button type='submit' >PLACE ORDER</button>
        </div>
    </div>
    
    </div>
    </form>
  )
}

export default Checkout