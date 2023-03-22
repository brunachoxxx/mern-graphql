import User from "../../models/user.js";
import { Resolvers } from "../../interface/resolver-types.js";
import { reg, login, update, del, getUser } from "../../services/users.js";

export const userResolvers: Resolvers = {
  Query: {
    users: async () => await User.find({ state: true }),
    user: async (_, { id }) => await getUser(id),
  },
  Mutation: {
    regUser: async (_, args) => {
      return await reg(args);
    },

    loginUser: async (_, args) => {
      return await login(args);
    },

    updateUser: async (_, args, { token }) => {
      return await update(args, token);
    },

    delUser: async (_, { id }, { token }) => {
      return await del(id, token);
    },
  },
};
