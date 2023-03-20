import { Resolvers } from "../../interface/resolver-types.js";
import Product from "../../models/products.js";
import { add, update, del } from "../../services/product.js";

export const productResolvers: Resolvers = {
  Query: {
    products: async () => {
      return await Product.find();
    },
    product: async (_, id) => {
      return await Product.findById(id);
    },
  },

  Mutation: {
    addProduct: async (_, args, { token }) => {
      return await add(args, token);
    },

    updateProduct: async (_, args, { token }) => {
      return await update(args, token);
    },

    delProduct: async (_, { id }, { token }) => {
      return await del(id, token);
    },
  },
};
