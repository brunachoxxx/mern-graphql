import { Schema, Types, Model, model } from "mongoose";
import { user } from "../interface/user.js";

const userSchema = new Schema<user>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // not unique for testing
    img: { type: String, unique: false },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    state: { type: Boolean, default: true },
    auth: { type: Boolean, default: false },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", userSchema);
