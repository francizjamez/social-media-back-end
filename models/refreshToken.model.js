import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
  {
    token: { type: String, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

const TokenModel = new mongoose.model("token", tokenSchema);

export default TokenModel;
