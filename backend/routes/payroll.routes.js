import express from "express";
import { generateSalary } from "../controllers/payroll.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/generate", protect, generateSalary);

export default router;