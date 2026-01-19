
import { StoreContext } from '../../context/StoreContext';
import './Fillters.css'
import React, { useContext, useEffect, useState } from 'react'

const Filters = () => {

  const [isOpen,setIsOpen] =useState(false);
  const {category,setFilterProducts,applyFilter,toggleCategory,subCategory,products,toggleSubCategory} =useContext(StoreContext)

  
  
  
    
  useEffect(()=>{
    applyFilter();
  },[category,subCategory]);

  return (
    <div className='filters-container'>
        <h2 onClick={()=>setIsOpen(!isOpen)}>Filtters</h2>
        <div className={`filter ${isOpen?"active":""}`}>
        <div className="categories">
            <p>CATEGORIES</p>
            <ul className="categories-checkbox">
            <li><input type="checkbox" value={'Men'}  onChange={toggleCategory}/>Men</li>
            <li><input type="checkbox" value={'Women'}  onChange={toggleCategory}/>Women</li>
            <li><input type="checkbox"  value={'Kids'}  onChange={toggleCategory}/>Kids</li>
            </ul>           
        </div>
        <div className="categories">
            <p>Type</p>
            <ul className="categories-checkbox">
            <li><input type="checkbox" value={'Topwear'}  onChange={toggleSubCategory}/>Topwear</li>
            <li><input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear</li>
            <li><input type="checkbox" value={'Winterwear'}  onChange={toggleSubCategory}/>Winterwear</li>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default Filters