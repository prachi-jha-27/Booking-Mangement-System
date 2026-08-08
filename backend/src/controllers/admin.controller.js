import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const createRealtor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const realtor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "realtor",
      createdBy: "Admin",
      realtorId: null,
    });

    return res.status(201).json({
      success: true,
      message: "Realtor created successfully",
      realtor: {
        id: realtor._id,
        name: realtor.name,
        email: realtor.email,
        role: realtor.role,
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