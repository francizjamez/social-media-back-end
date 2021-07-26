import UserModel from "../models/user.model.js";
import asyncHandler from "./asyncHandler.js";

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const currentUserId = req._id;
  const currentUser = await UserModel.findOne({ _id: currentUserId });
  res.status(200).send(currentUser);
});

export const getFollowSuggestions = asyncHandler(async (req, res, next) => {
  const currentUserId = req._id;
  let followSuggestions = await UserModel.find({
    _id: { $ne: currentUserId },
  });

  followSuggestions = followSuggestions.sort(() => Math.random() - 0.5);
  followSuggestions = followSuggestions.slice(0, 9);
  res.status(200).send(followSuggestions);
});
