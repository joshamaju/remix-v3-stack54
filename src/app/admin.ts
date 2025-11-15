import type { RouteHandlers } from "@remix-run/fetch-router";

import { routes } from "../routes";
import adminBooksHandlers from "./admin.books";
import adminOrdersHandlers from "./admin.orders";
import adminUsersHandlers from "./admin.users";
import { requireAdmin } from "./middleware/admin";
import { requireAuth } from "./middleware/auth";
import { render } from "./utils/render";

export default {
  middleware: [requireAuth, requireAdmin],
  handlers: {
    index() {
      return render("admin/index");
    },

    books: adminBooksHandlers,
    users: adminUsersHandlers,
    orders: adminOrdersHandlers,
  },
} satisfies RouteHandlers<typeof routes.admin>;
