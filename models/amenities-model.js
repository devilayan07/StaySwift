import mongoose from "mongoose";

const AmenitiesSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    price:{
        required:true,
        type:Number
    },
    instructions:{
        required:true,
        type:String

    },
    hours:{
        required:true,
        type:String
    }
})

 const AmenitiesModel=mongoose.models.Amenities || mongoose.model("Amenities",AmenitiesSchema)

 export default AmenitiesModel