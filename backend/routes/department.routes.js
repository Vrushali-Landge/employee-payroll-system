import express from "express";
import{
    createDepartment,
    getDepartments,
} from "../controllers/department.controller.js";
import {protect} from "../middleware/auth.middleware.js";
 const router=express.Router();
 router.post("/",protect,createDepartment);
 router.get("/",protect,getDepartments);


 export default  router;