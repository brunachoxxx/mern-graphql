import User from "../../models/user.js";
import { Resolvers } from "../../interface/resolver-types.js";
import { regUser } from "../../services/users.js";

export const userResolvers: Resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    addUser: async (_, args) => {
      const register = await regUser(args);
      return register;
    },

    updateUser: async (_, args) => {
      return await User.findByIdAndUpdate(args.id, args);
    },

    delUser: async (_, { id }) => {
      return await User.findByIdAndUpdate(id, { state: false }, { new: true });
    },
  },
};
