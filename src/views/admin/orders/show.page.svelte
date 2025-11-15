<script lang="ts">
  import { routes } from "../../../routes";
  import Layout from "../../components/layout.svelte";
  import type { Order } from "../../../app/models/orders";

  export let order: Order;
</script>

<Layout>
  <h1>Order #{order.id}</h1>

  <div class="card">
    <p>
      <strong>Order Date:</strong>
      {order.createdAt.toLocaleDateString()}
    </p>
    <p>
      <strong>User ID:</strong>
      {order.userId}
    </p>
    <p>
      <strong>Status:</strong>
      <span class="badge badge-info">{order.status}</span>
    </p>

    <h2 style="margin-top: 2rem;">Items</h2>
    <table style="margin-top: 1rem;">
      <thead>
        <tr>
          <th>Book</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {#each order.items as item}
          <tr>
            <td>{item.title}</td>
            <td>{item.quantity}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} style="text-align: right; font-weight: bold;">
            Total:
          </td>
          <td style="font-weight: bold;">${order.total.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>

    <h2 style="margin-top: 2rem;">Shipping Address</h2>
    <p>{order.shippingAddress.street}</p>
    <p>
      {order.shippingAddress.city}, {order.shippingAddress.state}
      {order.shippingAddress.zip}
    </p>
  </div>

  <p style="margin-top: 1.5rem;">
    <a class="btn btn-secondary" href={routes.admin.orders.index.href()}>
      Back to Orders
    </a>
  </p>
</Layout>
