import { readFileSync } from "fs";
import { userResolvers } from "./resolvers/user.js";
import { productResolvers } from "./resolvers/product.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rootTypeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const rootRresolvers = {
  Query: {
    hello: () => "Welcome",
  },
};

const userTypeDefs = readFileSync(__dirname + "/schemas/UserSchema.graphql", {
  encoding: "utf-8",
});
const productTypeDefs = readFileSync(
  __dirname + "/schemas/ProductSchema.graphql",
  {
    encoding: "utf-8",
  }
);

export const typeDefs = [rootTypeDefs, userTypeDefs, productTypeDefs];
export const resolvers = [rootRresolvers, userResolvers, productResolvers];
