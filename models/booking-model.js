import mongoose from "mongoose";
import {ObjectId} from "mongodb"

const BookingSchema=new mongoose.Schema({
    hotelId:{
        required:true,
        type:ObjectId
    },
        userId:{
        required:true,
        type:ObjectId
    },
    checkin:{
        required:true,
        type:String
    },
    checkout:{
       required:true,
       type:String
    }

})

 const BookingModel=mongoose.models.Bookings || mongoose.model("Bookings",BookingSchema)

export default BookingModel