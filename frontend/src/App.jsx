import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import Collection from './pages/Collection/Collection.jsx'
import Contact from './pages/Contact/Contact.jsx'
import About from './pages/About/About.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
import SignInSignUp from './components/SignINSignUp/SignInSignUp.jsx'
import Product from './pages/Product/Product.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart/Cart.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import Verify from './pages/Verify/Verify.jsx'
import { StoreContext } from './context/StoreContext';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const { token } = useContext(StoreContext)

  const ProtectedRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />
    return children
  }

  return (
    <>
    
    <div className="app" id="root">
    
      <ToastContainer/>
       <Navbar />
       <Routes>
        <Route path='/login' element={<SignInSignUp/>}></Route>
           <Route path='/' element={<Home/>}></Route>
           <Route path='/collection' element={<ProtectedRoute><Collection/></ProtectedRoute>}/>
           <Route path='/about' element={<About/>}/>
           <Route path='/contact' element={<Contact/>}/>
           <Route path='/myorders' element={<ProtectedRoute><MyOrders/></ProtectedRoute>} />
           <Route path='/product/:productId' element={<ProtectedRoute><Product/></ProtectedRoute>}/>
           <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}></Route>
           <Route path='/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
           <Route path='/verify' element={<ProtectedRoute><Verify/></ProtectedRoute>}></Route>
       </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
