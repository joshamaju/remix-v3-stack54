import type { BuildRouteHandler, RouteHandlers } from "@remix-run/fetch-router";

import { routes } from "../routes";

import { loadAuth } from "./middleware/auth";
import { searchBooks } from "./models/books";
import { render } from "./utils/render";

export let home = {
  middleware: [loadAuth],
  handler() {
    return render("marketing");
  },
};

export let about: BuildRouteHandler<"GET", typeof routes.about> = {
  middleware: [loadAuth],
  handler() {
    return render("about");
  },
};

export let contact: RouteHandlers<typeof routes.contact> = {
  middleware: [loadAuth],
  handlers: {
    index() {
      return render("contact/index");
    },

    async action() {
      return render("contact/action");
    },
  },
};

export let search: BuildRouteHandler<"GET", typeof routes.search> = {
  middleware: [loadAuth],
  handler({ url }) {
    let query = url.searchParams.get("q") ?? "";
    let books = query ? searchBooks(query) : [];
    return render("search", { books, query });
  },
};
