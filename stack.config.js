import { defineConfig } from "stack54/config";
import { server } from "./plugins/server.js";

export default defineConfig({
  integrations: [server()],
  views: ["src/views/**/*.svelte"],
});
