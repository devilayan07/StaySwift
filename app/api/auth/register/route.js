import User from "@/models/user-model";
import dbConnect from "@/service/mongo";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
export async function POST(request){
   const {
    fname,
    lname,
    email,
    password
   }=await request.json()
    await dbConnect()

    const hashedPassword=await bcrypt.hash(password,5);

    const newUser={
        name:`${fname} ${lname}`,
        email:email,
        password:hashedPassword
    }

    try {
        await User.create(newUser)
        return new NextResponse("User has been created",{
            status:201,
        })
        
    } catch (error) {
                return new NextResponse(error.message,{
            status:500,
        })

    }

}