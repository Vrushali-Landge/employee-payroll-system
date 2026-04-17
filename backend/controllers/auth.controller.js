import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.admin.create({
    data: {
      email,
      password: hash,
      name: "Admin",
      role: "ADMIN",
    },
  });

  res.json({ token: generateToken(user.id) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.admin.findUnique({
    where: { email },
  });

  if (!user) return res.status(404).json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(401).json({ msg: "Invalid password" });

  res.json({ token: generateToken(user.id) });
};