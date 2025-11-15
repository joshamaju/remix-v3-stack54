// @ts-check

import * as http from "node:http";
import { createRequestListener } from "@remix-run/node-fetch-server";

import router from "./dist/server/index.js";

let server = http.createServer(
  createRequestListener((req) => {
    return router.fetch(req);
  })
);

export default server;
