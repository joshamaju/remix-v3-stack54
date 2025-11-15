import type { RouteHandlers } from "@remix-run/fetch-router";

import { routes } from "../routes";
import { getAllOrders, getOrderById } from "./models/orders";
import { render } from "./utils/render";

export default {
  index() {
    let orders = getAllOrders();
    return render("admin/orders/index", { orders });
  },

  show({ params }) {
    let order = getOrderById(params.orderId);

    if (!order) {
      return render("admin/orders/notfound", {}, { status: 404 });
    }

    return render("admin/orders/show", { order });
  },
} satisfies RouteHandlers<typeof routes.admin.orders>;
