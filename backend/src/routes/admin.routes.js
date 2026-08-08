import express from "express";
import { createRealtor } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/create-realtor", createRealtor);

export default router;