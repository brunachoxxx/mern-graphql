import type { CodegenConfig } from "@graphql-codegen/cli";
import { resolvers } from "./src/graphql/index";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/graphql/schemas/*.graphql",
  generates: {
    "./src/interface/resolver-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
