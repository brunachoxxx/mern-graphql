import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.js";

export const jwtValidation = async (token: string) => {
  if (!token) throw new Error("No token in Request");
  const SECRETJWTKEY = <string>process.env.SECRETJWTKEY;
  const { id }: any = jwt.verify(token, SECRETJWTKEY);
  console.log(id);
  const user = await User.findById(id);
  if (!user) throw new Error("User doesn't exist");
  if (!user.state) throw new Error("User was deleted");
  return console.log(`${user} authenticated`);
};
