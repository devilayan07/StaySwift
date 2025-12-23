import dbConnect from "@/service/mongo"
import { NextResponse } from "next/server"
import BookingModel from "@/models/booking-model"
import mongoose from "mongoose"
export async function POST(request){
    const {
        hotelId,
        userId,
        checkin,
        checkout,

    }=await request.json()

    await dbConnect()

    const payload={
        hotelId:new mongoose.Types.ObjectId(hotelId),
        userId:new mongoose.Types.ObjectId(userId),
        checkin:checkin,
        checkout:checkout
    }

    try {
        await BookingModel.create(payload)
        return new NextResponse("A New Booking has been made",{
            status:201
        })
        
    } catch (error) {
            return new NextResponse(error.message,{
                    status:500,
                })
        
        
    }



}