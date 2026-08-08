import mongoose from "mongoose";

const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo DB connected successfully");
  }catch(error){
    console.log("Data base connection Error",error.message);
    process.exit(1);
  }
};
export default connectDB;