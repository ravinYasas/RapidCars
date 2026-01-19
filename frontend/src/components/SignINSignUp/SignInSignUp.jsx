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

         <form onSubmit={onLogin} className="login-container">
            <div className="login">
             <div className="login-title">
                    <h2>{currState}</h2>
                    <p className="login-title-bar"></p>
             </div>
             <img onClick={()=>navigate('/')} className='cursor' src={assets.cross_icon} alt="" srcSet="" />
             </div>
             <div className="login-inputs">
                {currState==="Sign In"?<></>:<input name='name'onChange={onChangeHandler} value={data.name} type="text"  placeholder='Your Name'required/>}
                
                <input name='email' type="email" onChange={onChangeHandler} value={data.email} placeholder='Your Email' required/>
                <input name='password' type="password" onChange={onChangeHandler} value={data.password} placeholder='Your password' required />
             </div>
                <button>{currState==="Sign Up"?"Create account":"Sign In"}</button>
             <div className="login-condition">
                    <input type='checkbox' required></input>
                    <p>By contuning ,i agree to the terms  of use & privacy policy</p>
             </div>

                {currState==="Sign In"?
                <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:
                <p>Already have an account? <span onClick={()=>setCurrState("Sign In")}>Login here</span></p>

                }
         </form>

    </div>
  )
}

export default SignInSignUp