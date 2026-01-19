import mongoose from "mongoose";

const clothSchema = new mongoose.Schema({
    // Core vehicle identity
    make:{type:String,required:true},
    model:{type:String,required:true},
    year:{type:Number,required:true},
    chassisCode:{type:String,required:true},
    grade:{type:String},
    mileage:{type:Number},
    transmission:{type:String},
    fuel:{type:String},
    color:{type:String},

    // Pricing & copy
    startingPrice:{type:Number,required:true},
    description:{type:String,required:true},

    // Media
    image:{type:Array,required:true},

    // Legacy fields kept for compatibility with frontend until fully migrated
    name:{type:String},
    price:{type:Number},
    category:{type:String},
    subCategory:{type:String},
    sizes:{type:Array},

    // Meta
    depositRequired:{type:Number,default:50000},
    date:{type:Number,required:true}
})

const clothModel = mongoose.models.cloth || mongoose.model("cloth",clothSchema)

export default clothModel;