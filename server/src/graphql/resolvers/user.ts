import User from "../../models/user.js";
import { Resolvers } from "../../interface/resolver-types.js";

export const userResolvers: Resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { _id }) => await User.findById(_id),
  },
  Mutation: {
    /* addUser: async (_, { email, password }) => {
      return await User.create({ email, password });
    }, */

    updateUser: async (_, args) => {
      return await User.findByIdAndUpdate(args._id, args);
    },

    delUser: async (_, { _id }) => {
      return await User.findByIdAndUpdate(_id, { state: false }, { new: true });
    },
  },
};
