import express from "express";
import {
  getCurrentUser,
  getFollowSuggestions,
} from "../controllers/user.controller.js";

import { authenticatorMiddleware } from "../middlewares.js";

const userRouter = express.Router();

userRouter.get("/current", authenticatorMiddleware, getCurrentUser);
userRouter.get(
  "/follow-suggestions",
  authenticatorMiddleware,
  getFollowSuggestions
);

export default userRouter;
