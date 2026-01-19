import './List.css'
import axios from "axios"
import {toast} from 'react-toastify'
import React, { useEffect, useState } from 'react'
import {assets} from '../../assets/assets'
import { backendUrl } from '../../App'


const List = ({token}) => {
  const [list,setList] =useState([]);

  const fetchList = async ()=>{
    const response = await axios.get(backendUrl+"/api/cloth/list");

    if (response.data.success) {
      setList(response.data.cloths); //data base name
    } else {
      toast.error("Error")
    }
  }

  const removeCloth = async (id)=>{
    const response =await axios.post(backendUrl+"/api/cloth/remove",{id},{headers:{token}});
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
      await fetchList();
    } else {
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list-container'>
      <div className="list-topic-main">
       <div className="list-topic">
       <p>All Cloth <span>List</span></p>
       <p className="bar"></p>
       </div>
      
      </div>
      <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>SubCategory</b>
            <b>Price</b>
            <b>Sizes</b>
            
            <b>Remove</b>
          </div>
          {list.map((item,index)=>{
            return(
              <div className="list-table-format" key={index}>
                <img src={item.image[0]} alt="" />
                
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.subCategory}</p>
                <p>${item.price}</p>
                <p>{item.sizes.join(',')}</p>
                
                <p  onClick={()=>removeCloth(item._id)}className='cursor'>X</p>
              </div>
            )
          })

          }

      </div>
  </div>
  )
}

export default List