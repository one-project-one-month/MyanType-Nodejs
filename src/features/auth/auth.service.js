import prisma from "../../config/prisma.js";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const registerUser = async (username, email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("Email already exists");
  }
  const userPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: userPassword,
    },
  });
  console.log("Insert successful");
  return user;
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User Not found");
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new Error("Invalid Password");
  }
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken, user };
};

const authService = {
  registerUser,
  loginUser,
};
export default authService;
