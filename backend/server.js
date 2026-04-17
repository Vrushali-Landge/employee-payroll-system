import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import paygradeRoutes from "./routes/paygrade.routes.js";
import employeeGradeRoutes from "./routes/employeeGrade.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/paygrades", paygradeRoutes);


app.use("/api/employees", employeeRoutes);

app.use("/api/departments", departmentRoutes);
app.use("/api/paygrades", paygradeRoutes);
app.use("/api/assign", employeeGradeRoutes);

app.use("/api/payroll", payrollRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});