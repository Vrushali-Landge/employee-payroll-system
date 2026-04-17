import prisma from "../config/prisma.js";
export const generateSalary = async (req, res) => {
  try {
    const { empId, month, year } = req.body;

    const record = await prisma.employeeGrade.findFirst({
      where: { empId: Number(empId) },
      include: { grade: true },
    });

    if (!record || !record.grade) {
      return res.status(404).json({ msg: "Grade not assigned" });
    }

    const g = record.grade;

    const gross =
      (g.basic || 0) +
      (g.da || 0) +
      (g.ta || 0) +
      (g.hra || 0) +
      (g.ma || 0) +
      (g.bonus || 0);

    const total = gross - ((g.pf || 0) + (g.pt || 0));

    const salary = await prisma.salary.create({
      data: {
        employee: {
          connect: { id: Number(empId) },
        },
        month,
        year,
        basic: g.basic,
        da: g.da,
        ta: g.ta,
        hra: g.hra,
        ma: g.ma,
        bonus: g.bonus,
        pf: g.pf,
        pt: g.pt,
        gross,
        total,
      },
    });

    res.json(salary);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};