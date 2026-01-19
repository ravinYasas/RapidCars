import { StoreContext } from "../../context/StoreContext";
import Item from "../Item/Item";
import "./AllCollection.css";
import React, { useContext, useEffect, useState } from "react";

const AllCollection = ({url}) => {

    
    const {filterProducts,applyFilter,category,subCategory,search,sortProducts,setSortType,sortType,products} =useContext(StoreContext)
    
    
    useEffect(()=>{
      sortProducts();
    },[sortType])

    useEffect(()=>{
      applyFilter();
    },[category,subCategory,search,products])

    

   

  return (
    <div className="allCollection-container">
      <div className="all-collection-up">
        <div className="all-collection-topic">
          <p>
            ALL <span>COLLECTIONS</span>
          </p>
          <p className="all-collectin-bar"></p>
        </div>
        <div class="sort-dropdown">
          <label for="sort">Sort by:</label>
          <select onChange={(e)=>setSortType(e.target.value)} id="sort" name="sort">
            <option value="relavent">Relavent</option>
            <option value="low-to-high">Price: Low To High</option>
            <option value="high-to-low">Price: High To Low</option>
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
      <div className="all-collection-down">
          {
            filterProducts.map((item,i)=>{
              return <Item key={i} id={item._id} image={item.image} 
              name={item.name} price={item.price}/>
          })
          }
            
      </div>
    </div>
  );
};

export default AllCollection;
