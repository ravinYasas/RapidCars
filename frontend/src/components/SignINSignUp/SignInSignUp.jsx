import './SignInSignUp.css'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
const SignInSignUp = ({setShowLogin}) => {
   const {backendUrl,token,setToken} =useContext(StoreContext)
   const navigate =useNavigate();
   const [data,setData] =useState({
      name:"",
      email:"",
      password:""
   })
    const [currState,setCurrState]=useState("Sign In")


    const onChangeHandler =(event)=>{
      const name=event.target.name;
      const value =event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event)=>{
      event.preventDefault();
      let newUrl=backendUrl;
      if (currState==="Sign In") {
         newUrl+='/api/user/login'
      }
      else{
         newUrl+='/api/user/register'
      }
      const response = await axios.post(newUrl,data)

      if (response.data.success) {
         setToken(response.data.token);
         localStorage.setItem("token",response.data.token)
         setShowLogin(false)
      } else {
         alert(response.data.message)
      }

    }

    useEffect(()=>{
      if (token) {
         navigate('/')
      }
    },[token])

   return (
      <div className='logIn'>
         <div className="auth-card">
             <div className="login-header">
                <div>
                   <h2>{currState}</h2>
                   <p className="login-subtitle">Access your Rapid Cars pre-orders and track imports.</p>
                </div>
                <button type="button" className="icon-btn" onClick={()=>navigate('/')}
                   aria-label="Close and go home">
                   <img src={assets.cross_icon} alt="Close" />
                </button>
             </div>

             <form onSubmit={onLogin} className="login-container">
                   <div className="login-inputs">
                        {currState==="Sign In"? null : (
                           <input name='name' onChange={onChangeHandler} value={data.name} type="text"  placeholder='Your Name' required />
                        )}
                        <input name='email' type="email" onChange={onChangeHandler} value={data.email} placeholder='Your Email' required/>
                        <input name='password' type="password" onChange={onChangeHandler} value={data.password} placeholder='Your password' required />
                   </div>
                   <button className="primary-btn auth-btn">{currState==="Sign Up"?"Create account":"Sign In"}</button>
                   <label className="login-condition">
                              <input type='checkbox' required />
                              <span>By continuing, I agree to the terms of use & privacy policy.</span>
                   </label>

                        {currState==="Sign In"?
                        <p className="switcher">New here? <span onClick={()=>setCurrState("Sign Up")}>Create account</span></p>:
                        <p className="switcher">Have an account? <span onClick={()=>setCurrState("Sign In")}>Sign in</span></p>

                        }
             </form>
         </div>
      </div>
   )
}

export default SignInSignUp