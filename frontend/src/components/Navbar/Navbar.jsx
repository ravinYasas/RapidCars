import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const[menu,setMenu] =useState("home");
    const navigate =useNavigate();
    //sidebar setup
    const [isOpen,setIsOpen] = useState(false);
    const [isSOpen,setIsSOpen] =useState(false)
    const {search,setSearch,setCartItems,setVisible,getCartCount,token,setToken} =useContext(StoreContext);
    const loaction =useLocation();

    useEffect(()=>{
        if (location.pathname.includes('collection') && isSOpen) {
            setVisible(true);
        }else{
            setVisible(false)
        }
        
    },[loaction])

    const logout =()=>{
        localStorage.removeItem("token");
        setToken("");
        setCartItems({})
        navigate("/")
    }
    

  return (
    <div className="navbar-container">
    <div className='navbar'>
        
        <Link to='/' ><img src={assets.logo} alt=""  className='logo' /></Link>
                        
        <ul className={`navbar-menu ${isOpen?"active":""}`}>         
            <li onClick={()=>{setMenu("home")}}><Link to='/'  >HOME</Link>{menu==="home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("collection")}}> <Link to='/collection' >COLLECTION</Link>{menu==="collection"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("about")}}><Link to='/about' >ABOUT</Link>{menu==="about"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("contact")}}><Link to='/contact' >CONTACT</Link>{menu==="contact"?<hr/>:<></>}</li>                   
        </ul>
        
        <div className="navbar-right">
            
            <img onClick={()=>setIsSOpen(!isSOpen)} src={assets.search_icon} alt="" />
            {!token?<button className='signin' onClick={()=>navigate('/login')}>Sign In</button>
            :<div className="navbar-profile">   
                <Link ><img src={assets.profile_icon} alt="" /></Link>
                <ul className="navbar-profile-dropdown">
                    <li onClick={()=>navigate('/myorders')}><p>Orders</p></li>
                    <hr />
                    <li onClick={logout} ><p>LogOut</p></li>
                </ul>
            </div>
            }
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.cart_icon} alt="" /></Link>
                <div className={"dot"}><p className='cart' >{getCartCount()}</p></div>
            </div>
            <div className="navbar-sidebar">
                <img src={assets.menu_icon} alt="" onClick={()=>setIsOpen(!isOpen)}/>
            </div>
        </div>
    </div>
    <div className={`navbar-search ${isSOpen?"active":""}`}>
        <div className="search">
        <input  type="text" placeholder='Search Here' value={search} onChange={(e)=>setSearch(e.target.value)} />
        <img  onClick={()=>setIsSOpen(isOpen)} src={assets.cross_icon} alt="" />
        </div>
    </div>
    </div>
  )
}

export default Navbar