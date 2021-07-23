import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import TokenModel from "../models/refreshToken.model.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const newUser = await new UserModel({ ...req.body, password: hash });
  const userRes = await newUser.save();
  res.send(userRes);
});

export const login = async (req, res) => {
  const { user_name, password } = req.body;
  const user = await UserModel.findOne({ user_name });

  if (!user) {
    res.status(401).send(`User does not exist`);
    return;
  }

  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    res.status(401).send(`Wrong password`);
    return;
  }

  const access_token = jwt.sign(
    { user_name, _id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
  );

  const refresh_token = jwt.sign(
    { user_name, _id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
  );

  const newToken = new TokenModel({ token: refresh_token, user: user._id });
  await newToken.save();

  res.status(200).send({ access_token, refresh_token });
};

export const logout = asyncHandler(async (req, res, next) => {
  await TokenModel.deleteMany({ user: req._id });
  res.status(200).send(`USER-LOGOUT-SUCCESS`);
});

export const getNewToken = asyncHandler(async (req, res, next) => {
  const { refresh_token } = req.body;
  const tokenFound = await TokenModel.findOne({ token: refresh_token });

  console.log(tokenFound, "tokfound");

  if (tokenFound) {
    console.log("token valid");
    jwt.verify({ ...tokenFound }, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign({ _id: tokenFound.user });
    res.status(201).send(newAccessToken);
  }
});
