import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    name:{
       required:true,
       type:String       
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    image:{
        required:false,
        type:String
    }
})

const User=mongoose.models.User || mongoose.model("User",UserSchema)

export default User