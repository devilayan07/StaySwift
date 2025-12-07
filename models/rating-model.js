import mongoose from "mongoose";
import {ObjectId} from "mongodb"
const RatingSchema=new mongoose.Schema({
    hotelId:{
        required:true,
        type:ObjectId
    },
    userId:{
        required:true,
        type:ObjectId
    },
    rating:{
        reuired:true,
        type:Number
    }

})

 const RatingModel=mongoose.models.Rating || mongoose.model("Rating",RatingSchema)

 export default RatingModel