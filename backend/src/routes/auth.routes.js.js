import express from "express";
 import { login, signup } from "../controllers/auth.controller.js";
 import authMiddleware from "../middlewares/auth.middleware.js";
import { profile } from "../controllers/get.auth.user.controller.js";

 const router=express.Router();
 router.post("/signup",signup);
 router.post("/login",login);
 router.get("/profile",authMiddleware,profile)
 export default router;