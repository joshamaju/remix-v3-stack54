import type { RouteHandlers } from "@remix-run/fetch-router";
import { redirect } from "@remix-run/fetch-router/response-helpers";

import { routes } from "../routes";

import { loadAuth, SESSION_ID_KEY } from "./middleware/auth";
import { getBookById } from "./models/books";
import {
  addToCart,
  getCart,
  getCartTotal,
  removeFromCart,
  updateCartItem,
} from "./models/cart";
import type { User } from "./models/users";
import { getCurrentUser, getStorage } from "./utils/context";
import { render } from "./utils/render";
import { setSessionCookie } from "./utils/session";

export default {
  middleware: [loadAuth],
  handlers: {
    index() {
      let sessionId = getStorage().get(SESSION_ID_KEY);
      let cart = getCart(sessionId);
      let total = getCartTotal(cart);

      let user: User | null = null;
      try {
        user = getCurrentUser();
      } catch {
        // user not authenticated
      }

      return render("cart", { user, total, cart });
    },

    api: {
      async add({ storage, formData }) {
        // Simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let sessionId = storage.get(SESSION_ID_KEY);
        let bookId = formData.get("bookId")?.toString() ?? "";

        let book = getBookById(bookId);
        if (!book) {
          return new Response("Book not found", { status: 404 });
        }

        addToCart(sessionId, book.id, book.slug, book.title, book.price, 1);

        let headers = new Headers();
        setSessionCookie(headers, sessionId);

        if (formData.get("redirect") === "none") {
          return new Response(null, { status: 204 });
        }

        return redirect(routes.cart.index.href(), { headers });
      },

      async update({ storage, formData }) {
        let sessionId = storage.get(SESSION_ID_KEY);
        let bookId = formData.get("bookId")?.toString() ?? "";
        let quantity = parseInt(
          formData.get("quantity")?.toString() ?? "1",
          10
        );

        updateCartItem(sessionId, bookId, quantity);

        let headers = new Headers();
        setSessionCookie(headers, sessionId);

        if (formData.get("redirect") === "none") {
          return new Response(null, { status: 204 });
        }

        return redirect(routes.cart.index.href(), { headers });
      },

      async remove({ storage, formData }) {
        // Simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let sessionId = storage.get(SESSION_ID_KEY);
        let bookId = formData.get("bookId")?.toString() ?? "";

        removeFromCart(sessionId, bookId);

        let headers = new Headers();
        setSessionCookie(headers, sessionId);

        if (formData.get("redirect") === "none") {
          return new Response(null, { status: 204 });
        }

        return redirect(routes.cart.index.href(), { headers });
      },
    },
  },
} satisfies RouteHandlers<typeof routes.cart>;
