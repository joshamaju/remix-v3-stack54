import { defineConfig } from "stack54/config";
import { server } from "./plugins/server.js";
import { logger } from "./plugins/logger.js";

export default defineConfig({
  staticDir: "public",
  views: ["src/views/**/*.svelte"],
  integrations: [server(), logger()],
});
