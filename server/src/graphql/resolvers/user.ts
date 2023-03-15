import UserModel from "../../models/user.js";

export const userResolvers = {
  Query: {
    users: async () => {
      try {
        const data = await UserModel.find();
        return data;
      } catch (error: any) {
        console.error(error.message, "fail getting users");
      }
    },
    /* user: async (_, { _id }) => {
      try {
        const data = await UserModel.findById(_id);
        return data;
      } catch (error: any) {
        console.error(error.message, "fail getting user");
      }
    }, */
  },
};
