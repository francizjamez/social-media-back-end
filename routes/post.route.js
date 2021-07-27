import express from "express";
import {
  addPost,
  getFeedPosts,
  getUserPosts,
  likePost,
  unlikePost,
} from "../controllers/post.controller.js";

import { authenticatorMiddleware } from "../middlewares.js";

const postRouter = express.Router();

postRouter.post("/", authenticatorMiddleware, addPost);
postRouter.get("/", authenticatorMiddleware, getFeedPosts);
postRouter.get("/:id", authenticatorMiddleware, getUserPosts);
postRouter.get("/like/:post_id", authenticatorMiddleware, likePost);
postRouter.get("/unlike/:post_id", authenticatorMiddleware, unlikePost);

export default postRouter;
