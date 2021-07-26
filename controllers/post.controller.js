import asyncHandler from "./asyncHandler.js";
import PostModel from "../models/post.model.js";

export const addPost = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  console.log(content);
  const newPost = await new PostModel({ content, author: req._id });
  const postRes = await newPost.save();
  res.status(201).send(postRes);
});

export const getFeedPosts = asyncHandler(async (req, res, next) => {
  const user = req._id;
  const posts = await PostModel.find({ author: { $ne: user } }).populate(
    "author"
  );
  res.status(200).send(posts);
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const postFound = await PostModel.findOne({ _id: id });
  if (postFound) {
    res.status(202).send(`Successfully deleted post`);
  } else {
    res.status(401).send(`Post not found`);
  }
});
