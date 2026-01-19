import './Add.css'
import { assets } from '../../assets/assets'
import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import {backendUrl} from '../../App'
const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name,setName] =useState("");
  const [description,setDescription] =useState("");
  const [price,setPrice] =useState("");
  const [category,setCategory] =useState("relevant");
  const [subCategory,setSubCategory]=useState("relevant");
  const  [sizes,setSizes] =useState([]);




  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl+"/api/cloth/add",formData,{headers:{token} })
      
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
    

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler} >
        <div className="add-details">
          <div className="add-left">
            <div className="add-img-upload ">

              <p className='topic'>Upload Image</p>
              <label htmlFor="image1">
                <img className='image' src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="" srcset="" />
                <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' name='image1' hidden required />
              </label>
              <label htmlFor="image2">
                <img className='image' src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="" srcset="" />
                <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' name='image2' hidden  />
              </label>
              <label htmlFor="image3">
                <img className='image' src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="" srcset="" />
                <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' name='image3' hidden  />
              </label>
              <label htmlFor="image4">
                <img className='image' src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="" srcset="" />
                <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' name='image4' hidden  />
              </label>

            </div>
            <div className="add-product-name flex-col">
              <p className='topic'>Product name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} type="text" name='name' placeholder='Your name ' required />
            </div>

            <div className="add-product-description flex-col">
              <p className='topic'>Product Description</p>
              <textarea onChange={(e)=>setDescription(e.target.value)} value={description} name="description" rows="6" placeholder='Enter details Product' required></textarea>
            </div>
          </div>
          <div className="add-right">
            <div className="category-details flex-col">
              <p className='topic category'>Category</p>
              <div className="category-content">
                <div className="category">
                  <p className='topic'>Product Category</p>
                  <select onChange={(e)=>setCategory(e.target.value)} value={category} name="category" id='Category' required >
                    <option value="relevant">relevant</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
                <div className="subCategory">
                  <p className='topic'>Product SubCategory</p>
                  <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} name="subCategory" id="Category" required>
                    <option value="relevant">relevant</option>
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="add-category-price flex-col">
              <div className="add-price">
                <p className='topic'>Product Price </p>
                <input onChange={(e)=>setPrice(e.target.value)} type="Number" value={price} name='price' placeholder='20$' required />
              </div>
              </div>
              <div className="add-sizes">
                <p className='topic'>Product Sizes</p>
              </div>
              <div className="sizes">
                <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter( item => item !== "S"): [...prev,"S"])} className='size-box'>
                  <p className={`${sizes.includes("S")?"size-bar":"unselect"}`}>S</p>
                </div>
                <div onClick={()=>setSizes(prev=>prev.includes("M") ? prev.filter(item =>item !== "M") : [...prev,"M"])} className='size-box'>
                  <p className={`${sizes.includes("M")?"size-bar":"unselect"}`} >M</p>
                </div>
                <div onClick={()=>setSizes(prev=>prev.includes("L") ? prev.filter(item =>item !== "L") : [...prev,"L"])} className='size-box'>
                  <p className={`${sizes.includes("L")?"size-bar":"unselect"}`}>L</p>
                </div>
                <div onClick={()=>setSizes(prev=>prev.includes("XL") ? prev.filter(item =>item !== "XL") : [...prev,"XL"])} className='size-box'>
                  <p className={`${sizes.includes("XL")?"size-bar":"unselect"}`}>XL</p>
                </div>
                <div onClick={()=>setSizes(prev=>prev.includes("XXL") ? prev.filter(item =>item !== "XXL") : [...prev,"XXL"])} className='size-box' >
                  <p className={`${sizes.includes("XXL")?"size-bar":"unselect"}`}>XXL</p>
                </div>
              


            </div>
            <button type='submit' className='add-btn'>Add</button>
          </div>
          
        </div>

       
      </form>
    </div>
  )
}
export default Add