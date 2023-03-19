import { user } from "../interface/user.js";
import User from "../models/user.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
import { jwtValidation } from "../utils/jwtValidation.js";
import { validate } from "graphql";
const { genSaltSync, hashSync, compare } = pkg;

export const regUser = async ({ email, password }: user) => {
  try {
    const onDb = await User.findOne({ email });
    if (!onDb) {
      const salt = genSaltSync();
      const encrypPw = hashSync(password, salt);
      const data = await User.create({ email, password: encrypPw });
      const SECRETJWTKEY = <string>process.env.SECRETJWTKEY;
      const token = jwt.sign({ id: data.id }, SECRETJWTKEY, {
        expiresIn: "20m",
      });
      return {
        code: "200",
        success: true,
        message: `User ${data.email} created`,
        user: data,
        token,
      };
    }
    return {
      code: "400",
      success: false,
      message: "User already created",
    };
  } catch (err: any) {
    return {
      code: "400",
      success: false,
      message: "Error registering user: " + err.message,
    };
  }
};

export const loginUser = async ({ email, password }: user) => {
  try {
    const onDb = await User.findOne({ email });
    if (!onDb) {
      return {
        code: "400",
        success: false,
        message: "User not registered",
      };
    }
    const checkPw = await compare(password, onDb.password);
    if (!checkPw) {
      return {
        code: "400",
        success: false,
        message: "Incorrect mail or password",
      };
    }
    const SECRETJWTKEY = <string>process.env.SECRETJWTKEY;
    const token = jwt.sign({ id: onDb.id }, SECRETJWTKEY, {
      expiresIn: "20m",
    });
    return {
      code: "200",
      success: true,
      message: `User ${onDb.email} Logged In`,
      user: onDb,
      token,
    };
  } catch (err: any) {
    return {
      code: "400",
      success: false,
      message: "Error registering user: " + err.message,
    };
  }
};

export const updateUser = async (id: string, args: {}, token: string) => {
  try {
    const validated = await jwtValidation(token);
    const user = await User.findByIdAndUpdate(validated.id, args);
    if (!user) {
      return {
        code: "400",
        success: false,
        message: "Error updating user",
      };
    }
    return {
      code: "200",
      success: true,
      message: `User ${user.email} updated`,
      user: user,
      token,
    };
  } catch (error: any) {
    return {
      code: "400",
      success: false,
      message: error.message,
    };
  }
};

export const delUser = async (id: string, token: string) => {
  try {
    const validated = await jwtValidation(token);
    const user = await User.findByIdAndUpdate(
      validated.id,
      { state: false },
      { new: true }
    );
    if (!user) {
      return {
        code: "400",
        success: false,
        message: "Error erasing user",
      };
    }
    return {
      code: "200",
      success: true,
      message: `User ${user.email} erased`,
      user: user,
      token,
    };
  } catch (error: any) {
    return {
      code: "400",
      success: false,
      message: error.message,
    };
  }
};
