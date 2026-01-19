import './List.css'
import axios from "axios"
import {toast} from 'react-toastify'
import React, { useEffect, useState } from 'react'
import {assets} from '../../assets/assets'
import { backendUrl } from '../../App'


const List = ({token}) => {
  const [list,setList] =useState([]);
  const [editing,setEditing] = useState(null);
  const [form,setForm] = useState({make:'',model:'',year:'',chassisCode:'',startingPrice:'',depositRequired:'',description:'',id:''});
  const [images,setImages] = useState({image1:null,image2:null,image3:null,image4:null});

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

  const startEdit = (item)=>{
    setEditing(item._id);
    setForm({
      id:item._id,
      make:item.make || '',
      model:item.model || '',
      year:item.year || '',
      chassisCode:item.chassisCode || '',
      startingPrice:item.startingPrice || '',
      depositRequired:item.depositRequired || '',
      description:item.description || ''
    })
    setImages({image1:null,image2:null,image3:null,image4:null})
  }

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setForm(prev=>({...prev,[name]:value}))
  }

  const handleImage = (e)=>{
    const {name,files} = e.target;
    setImages(prev=>({...prev,[name]:files?.[0] || null}))
  }

  const saveEdit = async ()=>{
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key,val])=>{
        if (val!==undefined && val!==null) {
          fd.append(key,val);
        }
      });
      Object.entries(images).forEach(([key,file])=>{
        if (file) fd.append(key,file);
      })

      const response = await axios.post(backendUrl+"/api/cloth/update",fd,{headers:{token}})
      if (response.data.success) {
        toast.success("Vehicle updated")
        setEditing(null)
        await fetchList();
      } else {
        toast.error(response.data.message || "Update failed")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list-container'>
      <div className="list-topic-main">
       <div className="list-topic">
       <p>Vehicle <span>Pre-Order Catalog</span></p>
       <p className="bar"></p>
       </div>
      
      </div>
      <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Make</b>
            <b>Model</b>
            <b>Year</b>
            <b>Chassis</b>
            <b>Starting Price</b>
            <b>Deposit</b>
            <b>Edit</b>
            <b>Remove</b>
          </div>
          {list.map((item,index)=>{
            return(
              <div className="list-table-format" key={index}>
                <img src={item.image[0]} alt="" />
                
                <p>{item.make}</p>
                <p>{item.model}</p>
                <p>{item.year}</p>
                <p>{item.chassisCode}</p>
                <p>LKR {item.startingPrice?.toLocaleString?.()}</p>
                <p>LKR {item.depositRequired?.toLocaleString?.()}</p>
                <p className='cursor edit' onClick={()=>startEdit(item)}>Edit</p>
                <p  onClick={()=>removeCloth(item._id)}className='cursor'>X</p>
              </div>
            )
          })

          }

      {editing && (
        <div className="edit-panel">
          <h4>Edit Vehicle</h4>
          <div className="edit-grid">
            <label>Make<input name="make" value={form.make} onChange={handleChange} /></label>
            <label>Model<input name="model" value={form.model} onChange={handleChange} /></label>
            <label>Year<input name="year" value={form.year} onChange={handleChange} /></label>
            <label>Chassis<input name="chassisCode" value={form.chassisCode} onChange={handleChange} /></label>
            <label>Starting Price (LKR)<input name="startingPrice" value={form.startingPrice} onChange={handleChange} /></label>
            <label>Deposit (LKR)<input name="depositRequired" value={form.depositRequired} onChange={handleChange} /></label>
            <label>Description<textarea name="description" value={form.description} onChange={handleChange} rows="3" /></label>
            <label>Photo 1<input type="file" name="image1" onChange={handleImage} accept="image/*" /></label>
            <label>Photo 2<input type="file" name="image2" onChange={handleImage} accept="image/*" /></label>
            <label>Photo 3<input type="file" name="image3" onChange={handleImage} accept="image/*" /></label>
            <label>Photo 4<input type="file" name="image4" onChange={handleImage} accept="image/*" /></label>
          </div>
          <div className="edit-actions">
            <button onClick={saveEdit}>Save</button>
            <button className='secondary' onClick={()=>setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}

      </div>
  </div>
  )
}

export default List