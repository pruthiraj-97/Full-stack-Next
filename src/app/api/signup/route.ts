import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import { sendEmail } from "@/helper/sendemail";
import UserModel from "@/models/user.model";
export async function POST(request:Request) {
    await dbConnect()
    try {
     const {username,email,password}=await request.json()
     const verifyOtp=Math.floor(100000 + Math.random() * 900000).toString()
     const userExist=await UserModel.findOne({email})
     if(userExist&&userExist.isVerified){
        return Response.json({
            success:false,
            message:"user already exist"
        })
     }else if(userExist&&!userExist.isVerified){
        return Response.json({
            success:false,
            message:"user already exist but not verified"
        })
     }
     
     const hashPassword=await bcrypt.hash(password,10)
     const newUser=new UserModel({
        username,
        email,
        password:hashPassword,
        verifyCode:verifyOtp,
        isVerified:false,
        messages:[]
     })
     await newUser.save()
     
    const emailResponse=await sendEmail(email,verifyOtp)
    if(!emailResponse.success){
        return Response.json({
            success:false,
            message:"fail to send verification email"
        })
    }
    return Response.json({
        success:true,
        message:"success in register"
    })
    } catch (error) {
        console.log("error in signup",error)
        return Response.json({
            success:false,
            message:"fail in register"
        })
    }
}