import { Request, Response } from "express";
import { jwtValidation } from "../utils/jwtValidation.js";
import { uploadImage } from "../utils/Cloudinary.js";
import Product from "../models/products.js";
import { unlink } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadPath = path.join(__dirname, "..", "uploads");

export const uploader = async (req: Request, res: Response) => {
  try {
    const { token } = req.headers;
    const { id } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Session token not valid" });
    } else if (!id) {
      return res.status(400).json({ message: "Id not provided" });
    }
    if (typeof token !== "string") {
      return res.json({
        message: "more than one token detected or token malformated",
      });
    }
    await jwtValidation(token);
    console.log(req.file);
    const path = req.file?.path;
    if (!path) {
      return res.status(400).json({ message: "Can't upload file" });
    }
    const uImg = await uploadImage(path, "productImg");
    const product = await Product.findByIdAndUpdate(id, { img: uImg });
    if (!product) {
      return res.status(400).json({ message: "Can't update product image" });
    }
    res.json({ message: "Image upload", product });
    //Needs permision to delete de files
    await unlink(uploadPath, (err) => {
      err ? console.log(err.message) : console.log("Folder cleaned");
    });
  } catch (error: any) {
    res.status(400).json({ message: "Uploading failed: " + error.message });
  }
};
