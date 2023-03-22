import {
  MutationRegUserArgs,
  MutationLoginUserArgs,
  MutationUpdateUserArgs,
} from "../interface/resolver-types.js";
import User from "../models/user.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
import { jwtValidation } from "../utils/jwtValidation.js";
const { genSaltSync, hashSync, compare } = pkg;

export const getUser = async (id: string) => {
  try {
    console.log(id);
    const data = await User.findById(id);
    if (data?.state === false) throw new Error("User not registered");
    console.log(data);
    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const reg = async ({ email, password }: MutationRegUserArgs) => {
  try {
    const onDb = await User.findOne({ email });
    if (!onDb) {
      const salt = genSaltSync();
      const encrypPw = hashSync(password, salt);
      const data = await User.create({ email, password: encrypPw });
      const SECRETJWTKEY = <string>process.env.SECRETJWTKEY;
      const token = jwt.sign({ id: data.id }, SECRETJWTKEY, {
        expiresIn: "1h",
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

export const login = async ({ email, password }: MutationLoginUserArgs) => {
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
      expiresIn: "1h",
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

export const update = async (
  { id, ...rest }: MutationUpdateUserArgs,
  token: string
) => {
  try {
    console.log(token);
    await jwtValidation(token);
    const user = await User.findByIdAndUpdate(id, rest);
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

export const del = async (id: string, token: string) => {
  try {
    await jwtValidation(token);
    const user = await User.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );
    if (!user) {
      return {
        code: "400",
        success: false,
        message: "Error deleting user",
      };
    }
    return {
      code: "200",
      success: true,
      message: `User ${user.email} deleted`,
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
