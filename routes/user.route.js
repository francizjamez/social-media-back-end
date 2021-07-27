import express from "express";
import {
  followUser,
  getCurrentUser,
  getFollowSuggestions,
  getUser,
  unfollowUser,
} from "../controllers/user.controller.js";

import { authenticatorMiddleware } from "../middlewares.js";

const userRouter = express.Router();

userRouter.get("/current", authenticatorMiddleware, getCurrentUser);
userRouter.get(
  "/follow-suggestions",
  authenticatorMiddleware,
  getFollowSuggestions
);
userRouter.get("/follow/:user_name", authenticatorMiddleware, followUser);
userRouter.get("/unfollow/:user_name", authenticatorMiddleware, unfollowUser);

userRouter.get("/:user_name", authenticatorMiddleware, getUser);

export default userRouter;
