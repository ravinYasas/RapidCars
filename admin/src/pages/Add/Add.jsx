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

  const [make,setMake] =useState("");
  const [model,setModel] =useState("");
  const [year,setYear] =useState("");
  const [chassisCode,setChassisCode] =useState("");
  const [grade,setGrade] =useState("");
  const [mileage,setMileage] =useState("");
  const [transmission,setTransmission] =useState("");
  const [fuel,setFuel] =useState("");
  const [color,setColor] =useState("");
  const [startingPrice,setStartingPrice] =useState("");
  const [description,setDescription] =useState("");
  const [depositRequired,setDepositRequired] =useState(50000);




  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("make",make)
      formData.append("model",model)
      formData.append("year",year)
      formData.append("chassisCode",chassisCode)
      formData.append("grade",grade)
      formData.append("mileage",mileage)
      formData.append("transmission",transmission)
      formData.append("fuel",fuel)
      formData.append("color",color)
      formData.append("startingPrice",startingPrice)
      formData.append("description",description)
      formData.append("depositRequired",depositRequired)

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl+"/api/cloth/add",formData,{headers:{token} })
      
      if (response.data.success) {
        toast.success(response.data.message)
        setMake('')
        setModel('')
        setYear('')
        setChassisCode('')
        setGrade('')
        setMileage('')
        setTransmission('')
        setFuel('')
        setColor('')
        setStartingPrice('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setDepositRequired(50000)
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
              <p className='topic'>Make</p>
              <input onChange={(e)=>setMake(e.target.value)} value={make} type="text" name='make' placeholder='e.g., Toyota' required />
            </div>
            <div className="add-product-name flex-col">
              <p className='topic'>Model</p>
              <input onChange={(e)=>setModel(e.target.value)} value={model} type="text" name='model' placeholder='e.g., Axio' required />
            </div>
            <div className="add-product-name flex-col">
              <p className='topic'>Year</p>
              <input onChange={(e)=>setYear(e.target.value)} value={year} type="number" name='year' placeholder='e.g., 2018' required />
            </div>
            <div className="add-product-name flex-col">
              <p className='topic'>Chassis Code</p>
              <input onChange={(e)=>setChassisCode(e.target.value)} value={chassisCode} type="text" name='chassisCode' placeholder='e.g., NZE161' required />
            </div>
            <div className="add-product-name flex-col">
              <p className='topic'>Grade / Trim</p>
              <input onChange={(e)=>setGrade(e.target.value)} value={grade} type="text" name='grade' placeholder='e.g., G Limited' />
            </div>
            <div className="add-product-name flex-col">
              <p className='topic'>Mileage (km)</p>
              <input onChange={(e)=>setMileage(e.target.value)} value={mileage} type="number" name='mileage' placeholder='e.g., 45000' />
            </div>
            <div className="add-product-name flex-col">
              <p className='topic'>Transmission</p>
              <input onChange={(e)=>setTransmission(e.target.value)} value={transmission} type="text" name='transmission' placeholder='e.g., Automatic' />
            </div>
            <div className="add-product-name flex-col">
              <p className='topic'>Fuel</p>
              <input onChange={(e)=>setFuel(e.target.value)} value={fuel} type="text" name='fuel' placeholder='e.g., Petrol / Hybrid' />
            </div>
            <div className="add-product-name flex-col">
              <p className='topic'>Color</p>
              <input onChange={(e)=>setColor(e.target.value)} value={color} type="text" name='color' placeholder='e.g., Pearl White' />
            </div>
            <div className="add-product-description flex-col">
              <p className='topic'>Vehicle Description</p>
              <textarea onChange={(e)=>setDescription(e.target.value)} value={description} name="description" rows="6" placeholder='Key options, auction notes, and condition highlights' required></textarea>
            </div>
          </div>
          <div className="add-right">
            <div className="add-category-price flex-col">
              <div className="add-price">
                <p className='topic'>Starting Price (LKR)</p>
                <input onChange={(e)=>setStartingPrice(e.target.value)} type="Number" value={startingPrice} name='startingPrice' placeholder='e.g., 3500000' required />
              </div>
              <div className="add-price">
                <p className='topic'>Deposit Required (LKR)</p>
                <input onChange={(e)=>setDepositRequired(e.target.value)} type="Number" value={depositRequired} name='depositRequired' placeholder='50000' required />
              </div>
              </div>
            <button type='submit' className='add-btn'>Add Vehicle</button>
          </div>
          
        </div>

       
      </form>
    </div>
  )
}
export default Add