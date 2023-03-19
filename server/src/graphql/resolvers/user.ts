import User from "../../models/user.js";
import { Resolvers } from "../../interface/resolver-types.js";
import { regUser, loginUser, updateUser } from "../../services/users.js";

export const userResolvers: Resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    regUser: async (_, args) => {
      const register = await regUser(args);
      return register;
    },

    loginUser: async (_, args) => {
      const log = await loginUser(args);
      return log;
    },

    updateUser: async (_, args, token) => {
      return await updateUser(args.id, args, token);
    },

    delUser: async (_, { id }, token) => {
      return await User.findByIdAndUpdate(id, { state: false }, { new: true });
    },
  },
};
