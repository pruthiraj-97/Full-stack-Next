import mongoose,{Schema,Document} from "mongoose";
export interface Message extends Document{
    content:string,
    createdAt:Date
}

const MessageSchema:Schema<Message>=new Schema({
     content:{
        type:String,
        required:true
     },
     createdAt:{
        type:Date,
        required:true,
        default:Date.now()
     }
})

export interface User extends Document{
    username:string;
    password:string;
    email:string;
    verifyCode:string;
    verifyExpires:Date;
    isVerified:boolean;
    messages:Message[]
}

const userSchema:Schema<User>=new Schema({
   username:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },
   verifyCode:{
    type:String
   },
   verifyExpires:{
    type:Date,
    default:Date.now()
   },
   isVerified:{
    type:Boolean,
    default:false
   },
   messages:[MessageSchema]
})

const UserModel=(mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("User",userSchema)
export default UserModel