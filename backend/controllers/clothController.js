import clothModel from "../models/clothModule.js";
import fs from 'fs'
import {v2 as cloudinary} from "cloudinary"
import { error } from "console";



//add cloth item

const addCloth = async (req,res)=>{
    //let image_filename =`${req.file.filename}`;

    try {
        const {name,description,price,category,subCategory,sizes}=req.body;
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images =[image1,image2,image3,image4].filter((item)=> item !==undefined)
        
        let imageUrl = await Promise.all(
            images.map(async (item)=>{
               let result =await cloudinary.uploader.upload(item.path,{resource_type:'image'});
               return result.secure_url
            })
        )

        const clothData ={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            sizes:JSON.parse(sizes),
            image:imageUrl,
            date:Date.now()
        }
        const cloth = new  clothModel(clothData);
        await cloth.save()
                
        res.json({success:true,message:"Data added"})
    
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
   

}

//all cloth listStyle
const listCloth =async(req,res)=>{
    try {
        const cloths = await clothModel.find({});
        res.json({success:true,cloths})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove  cloth item 
const removeCloth = async (req,res)=>{
   try {
        

        await clothModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Cloth Removed"})
   } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
   } 
}
//single product info
const singleCloth = async (req,res)=>{
    try {
        const {clothId} = req.body
        const cloth = await clothModel.findById(clothId)
        res.json({success:true,cloth})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
//update colth 

const updateCloth = async (req,res)=>{
    

    const {id,name,description,category,subCategory,sizes,price}=req.body;
    let  image_filename;

    if (req.file) {
        image_filename=`${req.file.filename}`
    }

    try {

        //Find the existing clothing item
        const cloth = await clothModel.findById(id);
        if (!cloth) {
            return res.json({success:false,message:"Clothing item not found"})
        }
        

        const updateCloth = await clothModel.findByIdAndUpdate(
            id,{
                name,
                description,
                category,
                subCategory,
                sizes,price,dates,
                ...(image_filename && {image:image_filename}),
            },
            {new:true}
        );

        if (!updateCloth) {
            return res.json({success:false,message:"Clothe items not found"})
        }
        if (image_filename &&cloth.image) {
            fs.unlink(`upload/${cloth.image}`,()=>{})
        }
            
        res.json({success:true,message:"Cloth Updated",data:updateCloth})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error updating Cloth Item"})
    }

}


export {addCloth,listCloth,removeCloth,updateCloth,singleCloth}