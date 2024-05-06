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
   const db=await mongoose.connect('mongodb://127.0.0.1:27017/fullstacknext')
   connection.isConneted=db.connections[0].readyState
   console.log("DB connected")
  } catch (error) {
    console.log("DB connect fail")
    process.exit(1)
  }
}

export default dbConnect