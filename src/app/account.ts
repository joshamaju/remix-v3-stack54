import type { RouteHandlers } from "@remix-run/fetch-router";
import { redirect } from "@remix-run/fetch-router/response-helpers";

import { routes } from "../routes.js";
import { requireAuth } from "./middleware/auth.js";
import { getOrderById, getOrdersByUserId } from "./models/orders.js";
import { updateUser } from "./models/users.js";
import { getCurrentUser } from "./utils/context.js";
import { render } from "./utils/render.js";

export default {
  middleware: [requireAuth],
  handlers: {
    index() {
      let user = getCurrentUser();
      return render("account/index", { user });
    },

    settings: {
      index() {
        let user = getCurrentUser();
        return render("account/settings/index", { user });
      },

      async update({ formData }) {
        let user = getCurrentUser();

        let name = formData.get("name")?.toString() ?? "";
        let email = formData.get("email")?.toString() ?? "";
        let password = formData.get("password")?.toString() ?? "";

        let updateData: any = { name, email };
        if (password) {
          updateData.password = password;
        }

        updateUser(user.id, updateData);

        return redirect(routes.account.index.href());
      },
    },

    orders: {
      index() {
        let user = getCurrentUser();
        let orders = getOrdersByUserId(user.id);
        return render("account/orders/index", { user, orders });
      },

      show({ params }) {
        let user = getCurrentUser();
        let order = getOrderById(params.orderId);

        if (!order || order.userId !== user.id) {
          return render(
            "account/orders/notfound",
            { user, order },
            { status: 404 }
          );
        }

        return render("account/orders/show", { user, order });
      },
    },
  },
} satisfies RouteHandlers<typeof routes.account>;
