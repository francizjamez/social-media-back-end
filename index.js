import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import { config } from "dotenv";
import postRouter from "./routes/post.route.js";
import userRouter from "./routes/user.route.js";

config();

const app = express();
const PORT = process.env.PORT || 6001;

app.use(morgan("tiny"));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.use(function (err, req, res, next) {
  if (err.toString().match(`TokenExpiredError`)) {
    res.status(401).send({ name: `TokenExpiredError` });
  } else if (err.toString().match(`refreshTokenError`)) {
    res.status(401).send({ name: `refreshTokenError` });
  } else {
    switch (err.code) {
      case 11000:
        const keys = Object.keys(err.keyPattern);
        res.status(402).send(`${keys.join(",")} already exists`);
        break;
      default:
        res.status(500).send("Something broke!");
    }
  }
});

mongoose.connect(
  `mongodb+srv://Admin:9TSYWED5W3vrG4E6@cluster0.holko.mongodb.net/social-media-backend?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log(`mongoose connected`);
  }
);

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
