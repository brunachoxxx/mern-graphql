import { Resolvers } from "../../interface/resolver-types.js";
import Product from "../../models/products.js";
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
    addProduct: async (_, args) => await Product.create(args),

    updateProduct: async (_, args) => {
      return await Product.findByIdAndUpdate(args.id, args);
    },
    delProduct: async (_, { id }) => {
      return await Product.findByIdAndUpdate(
        id,
        { state: false },
        { new: true }
      );
    },
  },
};
