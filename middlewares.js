import jwt from "jsonwebtoken";

export const authenticatorMiddleware = (req, res, next) => {
  const access_token = req.headers.authorization.split(" ")[1];

  const { _id } = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
  req._id = _id;
  next();
};
