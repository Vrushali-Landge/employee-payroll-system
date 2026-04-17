import express from "express";
import {
  createPayGrade,
  getPayGrades,
} from "../controllers/paygrade.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createPayGrade);
router.get("/", protect, getPayGrades);

export default router;