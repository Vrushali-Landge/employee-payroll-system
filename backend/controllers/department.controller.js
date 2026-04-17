import prisma from "../config/prisma.js";

export const createDepartment=async(req,res)=>{
    try{
        const dept=await prisma.department.create({
            data:req.body,
        });
        res.json(dept);

    }catch(err){
        res.status(500).json({msg:err.message});

    }

};
export const getDepartments=async(req,res)=>{
    const data=await prisma.department.findMany();
    res.json(data);
};
