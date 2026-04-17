import prisma from "../config/prisma.js";


export const createEmployee = async (req, res) => {
  const { name, city, state, mobile, dob, doj } = req.body;

  const emp = await prisma.employee.create({
    data: {
      name,
      city,
      state,
      mobile,
      dob: new Date(dob),   
      doj: new Date(doj),   
    },
  });

  res.json(emp);
};

// 
export const getEmployees = async (req, res) => {
  try {
    let { page, limit, search = "", state } = req.query;


    page = Number(page);
    limit = Number(limit);

    // check if NaN (not number)
     if (isNaN(page)) page = 1;
     if (isNaN(limit)) limit = 5;
     //      page=abc NaN
     // page=0	stays 0 → fails validation 
     // page=1	valid
     if (page < 1 || limit < 1) {
  return res.status(400).json({ msg: "Invalid pagination values" });
    }
    //  STEP 3: pagination logic
    const skip = (page - 1) * limit;
    //          1-1*2=0 so skip 0  take 2 emp
    // skip = (page - 1) * limit
    //  = (1 - 1) * 2
    //  = 0

    //  filters
    const where = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search } },
                { city: { contains: search } },
              ],
            }
          : {},
        state ? { state } : {},
      ],
    };

    //  DB call
    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip,
        take: limit,
      }),
      prisma.employee.count({ where }),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: employees,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


//update emp
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, city, state, mobile, dob, doj } = req.body;

    const employee = await prisma.employee.update({
      where: { id: Number(id) },
      data: {
        name,
        city,
        state,
        mobile,
        dob: dob ? new Date(dob) : undefined,
        doj: doj ? new Date(doj) : undefined,
      },
      
    });
    
    res.json(employee);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


//delete emp
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: { id: Number(id) },
    });

    res.json({ msg: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};