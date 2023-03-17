import { Resolvers } from "../../interface/resolver-types.js";
import Product from "../../models/products.js";
export const productResolvers: Resolvers = {
  Query: {
    products: async () => {
      return await Product.find();
    },
    product: async (_, _id) => {
      return await Product.findById(_id);
    },
  },

  Mutation: {
    /* addProduct: async (_, args) => {
      return await Product.create(args);
    }, */

    updateProduct: async (_, args) => {
      return await Product.findByIdAndUpdate(args._id, args);
    },
    delProduct: async (_, { _id }) => {
      return await Product.findByIdAndUpdate(
        _id,
        { state: false },
        { new: true }
      );
    },
  },
};
