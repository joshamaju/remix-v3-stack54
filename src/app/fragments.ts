import type { RouteHandlers } from "@remix-run/fetch-router";
import { html } from "@remix-run/fetch-router/response-helpers";
import type { Template } from "stack54/types";

import { routes } from "../routes";

import { makeFrameId } from "../utils/frame";
import BookCard from "../views/components/book-card.svelte";
import { loadAuth, SESSION_ID_KEY } from "./middleware/auth";
import { getBookBySlug } from "./models/books";
import { getCart } from "./models/cart";
import { getStorage } from "./utils/context";
import { render } from "./utils/render";

export default {
  middleware: [loadAuth],
  handlers: {
    async bookCard({ params, url }) {
      // Simulate network latency
      // await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()))

      let book = getBookBySlug(params.slug);

      if (!book) {
        return render("books/notfound", { isFrame: true }, { status: 404 });
      }

      let cart = getCart(getStorage().get(SESSION_ID_KEY));
      let inCart = cart.items.some((item) => item.slug === params.slug);

      const src = url.pathname;
      const id = makeFrameId(src);

      const context = new Map([["frame:current", { id, src }]]);

      const out = (BookCard as any as Template).render(
        { book, inCart },
        { context }
      );

      return html(`${out.head}${out.html}`);
    },
  },
} satisfies RouteHandlers<typeof routes.fragments>;
