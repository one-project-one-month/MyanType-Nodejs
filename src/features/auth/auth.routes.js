import { Router } from "express";

const authRouter = Router();

authRouter
  .post("/register", (req, res) => {})
  .post("/login", (req, res) => {})
  .post("/logout", (req, res) => {});

export default authRouter;
