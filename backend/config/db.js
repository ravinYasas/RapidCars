import mongoose from "mongoose";

export const connectDB= async()=>{
    await mongoose.connect(`${process.env.MONGODB_URL}/cloth-del`).then(()=>{
        console.log("DB Connected")
        
    });
}

//aiP1WGvLydhfj54f