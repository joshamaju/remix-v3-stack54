import { defineConfig } from "rollup";

export default defineConfig({
  input: "./api/server.js",
  output: { file: "api/index.js" },
});
