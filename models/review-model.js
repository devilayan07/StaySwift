import mongoose from "mongoose";
import {ObjectId} from "mongodb"

const ReviewSchema=new mongoose.Schema({
    hotelId:{
        required:true,
        type:ObjectId
    },
    userId:{
        required:true,
        type:ObjectId
    },
    review:{
        required:true,
        type:String
    }

})

 const ReviewModel=mongoose.models.Review || mongoose.model("Review",ReviewSchema)

 export default ReviewModel