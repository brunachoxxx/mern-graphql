import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const jwtValidation = async (token: string) => {
  if (!token) throw new Error("No token in Request");
  const SECRETJWTKEY = <string>process.env.SECRETJWTKEY;
  const data = jwt.verify(token, SECRETJWTKEY);
  const user = await User.findById(data);
  if (!user) throw new Error("User doesn't exist");
  if (!user.state) throw new Error("User was deleted");
  return user;
};
