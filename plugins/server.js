// @ts-check

import { createRequest, sendResponse } from "@remix-run/node-fetch-server";

const error_template = /*html*/ `
<html>
  <head>
    <script type="module" src="/@vite/client"></script>
  </head>
  <body>
    <pre>
      <code>Internal Server Error</code>
    </pre>
  </body>
</html>`;

/**
 *
 * @param {import('vite').ViteDevServer} server
 * @param {{ entry: string }} opts
 */
export function devServer(server, opts) {
  const serve_static = server.middlewares.stack.find(
    (middleware) => middleware.handle.name === "viteServeStaticMiddleware"
  );

  server.middlewares.use(async (req, res) => {
    const serverEntry = await server.ssrLoadModule(opts.entry);

    const request = createRequest(req, res);

    /** @type {import('@remix-run/fetch-router').Router} */
    const app = serverEntry.default;

    try {
      const response = await app.fetch(request);

      if (response.status === 404) {
        // @ts-expect-error
        serve_static?.handle(req, res, () => {
          sendResponse(res, response);
        });
      } else {
        sendResponse(res, response);
      }
    } catch (error) {
      /** @type {any} */
      const e = error;

      console.error(e);

      server.ws.send({
        type: "error",
        err: { ...e, stack: e.stack, message: e.message },
      });

      return sendResponse(
        res,
        new Response(error_template, {
          status: 500,
          headers: {
            "Content-Type": "text/html",
          },
        })
      );
    }
  });
}

/**
 *
 * @returns {import("stack54/config").Integration}
 */
export function server() {
  /** @type {import("stack54/config").ResolvedConfig} */
  let config;

  return {
    name: "server",
    configResolved(conf) {
      config = conf;
    },
    configureServer(server) {
      return () => devServer(server, config);
    },
  };
}
