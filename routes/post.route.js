import express from "express";
import { addPost, getFeedPosts } from "../controllers/post.controller.js";

import { authenticatorMiddleware } from "../middlewares.js";

const postRouter = express.Router();

postRouter.post("/", authenticatorMiddleware, addPost);
postRouter.get("/", authenticatorMiddleware, getFeedPosts);
// postRouter.delete("/:id", addPost);

export default postRouter;
