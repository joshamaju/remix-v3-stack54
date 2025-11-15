<script lang="ts">
  import type { Order } from "../../app/models/orders";
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";
  export let order: Order;
</script>

<Layout>
  <div class="alert alert-success">
    <h1 style="margin-bottom: 0.5rem;">Order Confirmed!</h1>
    <p>Thank you for your purchase. Your order has been placed successfully.</p>
  </div>

  <div class="card">
    <h2>Order #{order.id}</h2>
    <p>
      <strong>Order Date:</strong>
      {order.createdAt.toLocaleDateString()}
    </p>
    <p>
      <strong>Total:</strong> ${order.total.toFixed(2)}
    </p>
    <p>
      <strong>Status:</strong>
      <span class="badge badge-info">{order.status}</span>
    </p>

    <p style="margin-top: 2rem;">
      We'll send you a confirmation email shortly. You can track your order
      status in your account.
    </p>

    <div style="margin-top: 2rem;">
      <a
        class="btn"
        href={routes.account.orders.show.href({ orderId: order.id })}
      >
        View Order Details
      </a>
      <a
        class="btn btn-secondary"
        style="margin-left: 0.5rem;"
        href={routes.books.index.href()}
      >
        Continue Shopping
      </a>
    </div>
  </div>
</Layout>
