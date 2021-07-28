import asyncHandler from "./asyncHandler.js";
import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";

export const addPost = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const newPost = await new PostModel({ content, author: req._id });
  const postRes = await newPost.save();
  res.status(201).send(postRes);
});

export const getFeedPosts = asyncHandler(async (req, res, next) => {
  const currentUserId = req._id;
  const currentUser = await UserModel.findOne({ _id: currentUserId });
  let posts = await PostModel.find({})
    .populate("author")
    .sort({ createdAt: `desc` });
  posts = posts.filter((el) => {
    return (
      currentUser.following.includes(el.author._id) ||
      el.author._id.toString() === currentUserId.toString()
    );
  });
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

export const getUserPosts = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const posts = await PostModel.find({ author: id.toString() })
    .populate("author")
    .sort({
      createdAt: `desc`,
    });

  res.status(200).send(posts);
});

export const likePost = asyncHandler(async (req, res, next) => {
  const currentUserId = req._id;
  const { post_id } = req.params;

  await PostModel.updateOne(
    { _id: post_id },
    {
      $addToSet: {
        likes: [currentUserId],
      },
    }
  );

  res.status(201).send(`liked post`);
});

export const unlikePost = asyncHandler(async (req, res, next) => {
  const currentUserId = req._id;
  const { post_id } = req.params;

  await PostModel.updateOne(
    { _id: post_id },
    {
      $pull: {
        likes: currentUserId,
      },
    }
  );

  res.status(201).send(`unliked post`);
});
