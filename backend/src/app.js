import express from "express";
import homeRoutes from "./routes/homeRoutes.js";
import authRoutes from "./routes/auth.routes.js.js";
import adminRoutes from "./routes/admin.routes.js";
import cookieParser from "cookie-parser";


const app=express();
app.use(cookieParser());

app.use(express.json());
app.use("/",homeRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/admin",adminRoutes);
export default app;