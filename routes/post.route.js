import express from "express";
import {
  addPost,
  deletePost,
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
postRouter.get("/delete/:post_id", authenticatorMiddleware, deletePost);

export default postRouter;
