import express from "express";
import {
  getNewToken,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { authenticatorMiddleware } from "../middlewares.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", authenticatorMiddleware, logout);
authRouter.post("/refresh_token", getNewToken);
authRouter.get("/", (req, res) => res.send("auth here"));

export default authRouter;
