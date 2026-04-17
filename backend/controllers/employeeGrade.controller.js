import prisma from "../config/prisma.js";

export const assignEmployee = async (req, res) => {
  const { empId, deptId, gradeId } = req.body;

  const data = await prisma.employeeGrade.create({
    data: {
      empId,
      deptId,
      gradeId,
    },
  });

  res.json(data);
};


