import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const Database = async()=>{
    try{
      const DB=  await mongoose.connect(process.env.MONGODB_URL)
      console.log("MongoDB connected")
    }catch (error) {
      console.log("Error connecting to MongoDB Database => ", error);
      // process.exit(1);
  }
}

export default Database;