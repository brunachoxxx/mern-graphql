import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.js";

export const jwtValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("authToken");
  if (!token) return { message: "No token in Request" };
  const SECRETJWTKEY = <string>process.env.SECRETJWTKEY;
  const data = jwt.verify(token, SECRETJWTKEY);
  console.log(data);
  const exist = await User.findById(data);
  if (!exist) return { message: "User doesn't exist" };
  if (!exist.state) return { message: "User not registered" };
  next();
};
