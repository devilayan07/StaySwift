import ReviewModel from "@/models/review-model"
import dbConnect from "@/service/mongo"
import { NextResponse } from "next/server"

export async function POST(request){
    const{
        hotelId,
        userId,
        review
    }=await request.json()
    await dbConnect()

  const newReview={
    hotelId:hotelId,
    userId:userId,
    review:review
  }

  try {
    await ReviewModel.create(newReview)
    return new NextResponse("Successfully Reviewed",{
        status:201
    })
  } catch (error) {
    return new NextResponse(error.message,{
            status:500,
        })

  }

}