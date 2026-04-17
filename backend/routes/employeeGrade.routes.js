import express from "express";
import { assignEmployee } from "../controllers/employeeGrade.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, assignEmployee); 

export default router;