import clothModel from "../models/clothModule.js";
import fs from 'fs'
import {v2 as cloudinary} from "cloudinary"
import { error } from "console";



//add cloth item

const addCloth = async (req,res)=>{
    //let image_filename =`${req.file.filename}`;

    try {
        const {make,model,year,chassisCode,grade,mileage,transmission,fuel,color,startingPrice,description,depositRequired} = req.body;
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
            make,
            model,
            year:Number(year),
            chassisCode,
            grade,
            mileage:mileage?Number(mileage):undefined,
            transmission,
            fuel,
            color,
            startingPrice:Number(startingPrice),
            description,
            image:imageUrl,
            depositRequired:depositRequired?Number(depositRequired):50000,
            // legacy for compatibility
            name: `${make} ${model} ${year}`,
            price:Number(startingPrice),
            category: make,
            subCategory: model,
            sizes: [],
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
// update vehicle / cloth
const updateCloth = async (req,res)=>{
    try {
        const {
            id,
            make,
            model,
            year,
            chassisCode,
            grade,
            mileage,
            transmission,
            fuel,
            color,
            startingPrice,
            description,
            depositRequired
        } = req.body;

        const cloth = await clothModel.findById(id);
        if (!cloth) {
            return res.json({success:false,message:"Vehicle not found"})
        }

        // handle optional new images
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];
        const images = [image1,image2,image3,image4].filter(Boolean);

        let imageUrl = cloth.image;
        if (images.length > 0) {
            imageUrl = await Promise.all(
                images.map(async (item)=>{
                   const result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                   return result.secure_url
                })
            )
        }

        const updated = await clothModel.findByIdAndUpdate(
            id,
            {
                ...(make && {make}),
                ...(model && {model}),
                ...(year && {year:Number(year)}),
                ...(chassisCode && {chassisCode}),
                ...(grade && {grade}),
                ...(mileage && {mileage:Number(mileage)}),
                ...(transmission && {transmission}),
                ...(fuel && {fuel}),
                ...(color && {color}),
                ...(startingPrice && {startingPrice:Number(startingPrice), price:Number(startingPrice)}),
                ...(description && {description}),
                ...(depositRequired && {depositRequired:Number(depositRequired)}),
                image:imageUrl,
                // legacy fields
                name: `${make || cloth.make} ${model || cloth.model} ${year || cloth.year}`.trim(),
                category: make || cloth.make,
                subCategory: model || cloth.model,
            },
            {new:true}
        );

        res.json({success:true,message:"Vehicle updated",data:updated})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message || "Error updating vehicle"})
    }

}


export {addCloth,listCloth,removeCloth,updateCloth,singleCloth}