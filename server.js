// @ts-check

import * as http from "node:http";
import { createRequestListener } from "@remix-run/node-fetch-server";

import router from "./dist/server/index.js";

const port = process.env.PORT || 8080;

let server = http.createServer(
  createRequestListener((req) => {
    return router.fetch(req);
  })
);

server.listen(port, () => {
  console.log(`✅ app ready: http://localhost:${port}`);
});
