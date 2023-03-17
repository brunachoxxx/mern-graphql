import { Schema, model } from "mongoose";

const prodcutModel = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", prodcutModel);
