export const getHome=(req,res)=>{
  res.status(200).json({
    success:true,
    message:"Booking Management Api is running"
  });
}