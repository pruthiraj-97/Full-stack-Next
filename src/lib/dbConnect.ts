import mongoose from "mongoose";
type ConnectionObject={
    isConneted?:number
}

const connection:ConnectionObject={}

async function  dbConnect():Promise<void>
{
  if(connection.isConneted){
    console.log("Already connect")
    return
  }

  try {
   const db=await mongoose.connect(process.env.MONGODB_URL||'')
   connection.isConneted=db.connections[0].readyState
   console.log("DB connected")
  } catch (error) {
    console.log("DB connect fail")
    process.exit(1)
  }
}

export default dbConnect