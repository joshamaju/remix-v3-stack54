import { html } from "@remix-run/fetch-router/response-helpers";
import { resolver } from "../../utils/view";
import { resolveFrame } from "./frame";
import { renderToStream } from "./stream";

export function render(name: string, props?: any, init?: ResponseInit) {
  return html(renderToStream(resolver(name), props, { resolveFrame }), init);
}
