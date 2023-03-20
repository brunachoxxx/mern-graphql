import {
  MutationUpdateProductArgs,
  MutationAddProductArgs,
} from "../interface/resolver-types.js";
import Product from "../models/products.js";
import { jwtValidation } from "../utils/jwtValidation.js";

export const add = async (args: MutationAddProductArgs, token: string) => {
  try {
    await jwtValidation(token);
    const check = await Product.findOne({ name: args.name });
    if (check) {
      return {
        code: "400",
        success: false,
        message: "Product already exist try updating quntity",
      };
    }
    const product = await Product.create(args);
    return {
      code: "200",
      success: true,
      message: `Product ${args.name} crated`,
      product: product,
    };
  } catch (error: any) {
    return {
      code: "400",
      success: false,
      message: "Product not added: " + error.message,
    };
  }
};
export const update = async (
  { id, ...rest }: MutationUpdateProductArgs,
  token: string
) => {
  try {
    await jwtValidation(token);
    const product = await Product.findByIdAndUpdate(id, rest);
    if (!product) {
      return {
        code: "400",
        success: false,
        message: "Can not find Product",
      };
    }
    return {
      code: "200",
      success: true,
      message: `Product ${product.name} updated`,
      product: product,
    };
  } catch (error: any) {
    return {
      code: "400",
      success: false,
      message: "Product not updated: " + error.message,
    };
  }
};
export const del = async (id: string, token: string) => {
  try {
    await jwtValidation(token);
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return {
        code: "400",
        success: false,
        message: "Can not find Product",
      };
    }
    return {
      code: "200",
      success: true,
      message: `Product ${product.name} deleted`,
      product: product,
    };
  } catch (error: any) {
    return {
      code: "400",
      success: false,
      message: "Product not deleted: " + error.message,
    };
  }
};
