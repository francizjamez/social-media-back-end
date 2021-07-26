import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const PostModel = new mongoose.model("post", postSchema);

export default PostModel;
