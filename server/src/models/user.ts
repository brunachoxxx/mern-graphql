import { Schema, Types, Model, model } from "mongoose";
import { user } from "../interface/user.js";

const userSchema = new Schema<user>(
  {
    name: { type: String, required: false, unique: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // not unique for testing
    img: { type: String, unique: false },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    state: { type: Boolean, default: true },
    googleAuth: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("User", userSchema);
export default UserModel;
