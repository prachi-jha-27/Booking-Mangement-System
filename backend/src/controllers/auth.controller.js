import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, realtorId } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }
    let linkedRealtor = null;

    if (realtorId) {
      linkedRealtor = await User.findOne({
        _id: realtorId,
        role: "realtor",
      });

      if (!linkedRealtor) {
        return res.status(400).json({
          success: false,
          message: "Invalid realtor",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdBy: linkedRealtor ? "Realtor" : "Self",
      realtorId: linkedRealtor ? linkedRealtor._id : null,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login=async (req,res)=>{
  try{
const {email,password}=req.body;
if(!email || !password){
  return res.status(400).json({
    success: false,
    message: "Email and Password are required",
  });
}
const user = await User.findOne({ email });

if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}
const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
}
const token = generateToken(user._id, user.role);
res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
res.status(200).json({
  success:true,
  message:"Login Successfully",
});
  }catch(error){
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

