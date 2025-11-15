import type { RouteHandlers } from "@remix-run/fetch-router";
import { redirect } from "@remix-run/fetch-router/response-helpers";

import { routes } from "../routes";
import { requireAuth, SESSION_ID_KEY } from "./middleware/auth";
import { clearCart, getCart, getCartTotal } from "./models/cart";
import { createOrder, getOrderById } from "./models/orders";
import { getCurrentUser, getStorage } from "./utils/context";
import { render } from "./utils/render";

export default {
  middleware: [requireAuth],
  handlers: {
    index() {
      let sessionId = getStorage().get(SESSION_ID_KEY);
      let cart = getCart(sessionId);
      let total = getCartTotal(cart);

      if (cart.items.length === 0) {
        return render("checkout/empty");
      }

      return render("checkout/index", { total, cart });
    },

    async action({ formData }) {
      let user = getCurrentUser();
      let sessionId = getStorage().get(SESSION_ID_KEY);
      let cart = getCart(sessionId);

      if (cart.items.length === 0) {
        return redirect(routes.cart.index.href());
      }

      let shippingAddress = {
        street: formData.get("street")?.toString() || "",
        city: formData.get("city")?.toString() || "",
        state: formData.get("state")?.toString() || "",
        zip: formData.get("zip")?.toString() || "",
      };

      let order = createOrder(
        user.id,
        cart.items.map((item) => ({
          bookId: item.bookId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress
      );

      clearCart(sessionId);

      return redirect(routes.checkout.confirmation.href({ orderId: order.id }));
    },

    confirmation({ params }) {
      let user = getCurrentUser();
      let order = getOrderById(params.orderId);

      if (!order || order.userId !== user.id) {
        return render("checkout/notfound", {}, { status: 404 });
      }

      return render("checkout/confirmation", { order });
    },
  },
} satisfies RouteHandlers<typeof routes.checkout>;
