// @ts-check

import * as http from "node:http";
import { createRequestListener } from "@remix-run/node-fetch-server";

import router from "../dist/server/index.js";

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage; }} res
 */
export default function handler(req, res) {
  const listener = createRequestListener((nodeReq) => router.fetch(nodeReq));
  return listener(req, res);
}
