import prisma from "../config/prisma.js";
export const createPayGrade = async (req, res) => {
  try {
    

    const grade = await prisma.payGrade.create({
      data: req.body,
    });

    res.json(grade);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getPayGrades=async(req,res)=>{
    try{
    const data=await prisma.payGrade.findMany();
    res.json(data);

} catch (err) {
    res.status(500).json({ msg: err.message });
  }
}