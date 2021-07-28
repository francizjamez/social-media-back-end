import UserModel from "../models/user.model.js";
import asyncHandler from "./asyncHandler.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const { user_name } = req.params;
  const user = await UserModel.findOne({ user_name: user_name })
    .populate("following")
    .populate("followers");
  res.status(200).send(user);
});

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const currentUserId = req._id;
  const currentUser = await UserModel.findOne({ _id: currentUserId });
  res.status(200).send(currentUser);
});

export const getFollowSuggestions = asyncHandler(async (req, res, next) => {
  const currentUserId = req._id;
  let followSuggestions = await UserModel.find({
    _id: { $ne: currentUserId },
    followers: { $nin: currentUserId },
  }).select({ user_name: 1, followers: 1 });

  followSuggestions = followSuggestions.sort(() => Math.random() - 0.5);
  followSuggestions = followSuggestions.slice(0, 5);
  res.status(200).send(followSuggestions);
});

export const followUser = asyncHandler(async (req, res, next) => {
  const currentUserId = req._id;
  const { user_name } = req.params;

  await UserModel.updateOne(
    { user_name: user_name },
    {
      $addToSet: {
        followers: [currentUserId],
      },
    }
  );
  const userToFollow = await UserModel.findOne({ user_name: user_name });

  await UserModel.updateOne(
    { _id: currentUserId },
    {
      $addToSet: {
        following: [userToFollow._id],
      },
    }
  );

  res.status(201).send(`followed user`);
});

export const unfollowUser = asyncHandler(async (req, res, next) => {
  const currentUserId = req._id;
  const { user_name } = req.params;

  await UserModel.updateOne(
    { user_name: user_name },
    {
      $pull: {
        followers: currentUserId,
      },
    }
  );

  const userToUnfollow = await UserModel.findOne({ user_name: user_name });

  await UserModel.updateOne(
    { _id: currentUserId },
    {
      $pull: {
        following: userToUnfollow._id,
      },
    }
  );
  res.status(201).send(`unfollowed user`);
});

export const getUserFollowing = asyncHandler(async (req, res, next) => {});
