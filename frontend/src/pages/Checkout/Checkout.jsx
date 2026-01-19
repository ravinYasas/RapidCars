import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import CartTotal from '../../components/CartTotal/CartTotal.jsx'
import { StoreContext } from '../../context/StoreContext.jsx';


import './Checkout.css'

import React, { useContext, useMemo, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';



const Checkout = () => {
    const { backendUrl,token,cartItem,setCartItems,products,getCartAmount } = useContext(StoreContext) 
    const navigate =useNavigate();
    const [depositRef ,setDepositRef] = useState('');

    const depositAmount = useMemo(()=>{
        let total = 0;
        for(const itemId in cartItem){
            for(const size in cartItem[itemId]){
                const qty = cartItem[itemId][size];
                if (qty > 0) {
                    const itemInfo = products.find(p=>p._id === itemId);
                    if (itemInfo) {
                        total += (itemInfo.depositRequired || 50000) * qty;
                    }
                }
            }
        }
        return total || 50000;
    },[cartItem,products]);

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
                    amount:getCartAmount(),
                    paymentMethod:'Bank Deposit',
                    depositReference:depositRef,
                    depositAmount: depositAmount
                }
                
                const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                
                if (response.data.success) {
                    setCartItems({})
                    navigate('/myorders')
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message  )
                }
                
            } catch (error) {
                toast.error(error.message)
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
            <div className="payment-type deposit-box">
                <h3>Bank Deposit (Required)</h3>
                <p>Deposit LKR {depositAmount.toLocaleString('en-LK')} to proceed with vehicle import.</p>
                <p>Account Name: Rapid Cars</p>
                <p>Bank: HNB Bank</p>
                <p>Branch: Thimbirigasyaya</p>
                <p>Account No: 092020023628</p>
                <p className='muted'>Use your name and phone as reference. Enter the deposit reference below.</p>
                <input id='input-fields' name='depositRef' onChange={(e)=>setDepositRef(e.target.value)} value={depositRef} className='cart-personal' type="text" placeholder='Bank deposit reference number' required />
            </div>
      
        <button type='submit' >CONFIRM PRE-ORDER</button>
        </div>
    </div>
    
    </div>
    </form>
  )
}

export default Checkout