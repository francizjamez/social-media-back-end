import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    display_picture: { type: String, data: Buffer },
  },

  { timestamps: true }
);

const UserModel = new mongoose.model("user", userSchema);

export default UserModel;
