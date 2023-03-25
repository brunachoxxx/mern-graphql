import path from "path";
import {
  MutationUpdateProductArgs,
  MutationAddProductArgs,
} from "../interface/resolver-types.js";
import Product from "../models/products.js";
import { uploadImage } from "../utils/Cloudinary.js";
import { jwtValidation } from "../utils/jwtValidation.js";

export const getProduct = async (id: string) => {
  try {
    console.log(id);
    const data = await Product.findById(id);
    console.log(data);
    return data;
  } catch (error: any) {
    return error.message;
  }
};

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
//gaphql upload implementation not finish...
/* export const uploadImg = async (
  id: string,
  imagePath: string,
  token: string
) => {
  try {
    await jwtValidation(token);
    
    const image = await uploadImage(imagePath, "productImg");
    if (!image) {
      return {
        code: "400",
        success: false,
        message: "Can't upload File",
      };
    }
    const product = await Product.findByIdAndUpdate(id, { image });
    if (!product) {
      return {
        code: "400",
        success: false,
        message: "Can't find Product",
      };
    }
    return {
      code: "200",
      success: true,
      message: `${product.name} profile pic Updated`,
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
 */
