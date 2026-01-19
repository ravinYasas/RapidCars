import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from './pages/Orders/Orders.jsx'
import Login from './components/login/Login.jsx';




export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  


const [token,setToken] =useState(localStorage.getItem('token')?localStorage.getItem('token'):``);

useEffect(()=>{
  localStorage.setItem('token',token)
},[token])
  return (
    <div><ToastContainer/>
      {token === ""?
      <Login setToken={setToken}/>:<>
      
      <Navbar setToken={setToken}/>
      <hr />
      <div className="app-content">
        
        <Routes>
              <Route path='/add' element={<Add  token={token}/>}></Route>
              <Route path='/list' element={<List token={token}/>}/>
              <Route path='/orders' element={<Orders  token={token}/>}/>
        </Routes>
        
      </div>
      </>
      }
    </div>
  )
}

export default App
