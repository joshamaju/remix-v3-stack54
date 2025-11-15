<script lang="ts">
  import { routes } from "../../../routes";
  import Layout from "../../components/layout.svelte";
  import type { Order } from "../../../app/models/orders";

  export let orders: Order[];
</script>

<Layout>
  <h1>Manage Orders</h1>

  <p style="margin-bottom: 1rem;">
    <a href={routes.admin.index.href()} class="btn btn-secondary">
      Back to Dashboard
    </a>
  </p>

  <div class="card">
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each orders as order}
          <tr>
            <td>#{order.id}</td>
            <td>{order.createdAt.toLocaleDateString()}</td>
            <td>{order.items.length} item(s)</td>
            <td>${order.total.toFixed(2)}</td>
            <td>
              <span class="badge badge-info">{order.status}</span>
            </td>
            <td>
              <a
                class="btn btn-secondary"
                style="font-size: 0.875rem; padding: 0.25rem 0.5rem;"
                href={routes.admin.orders.show.href({ orderId: order.id })}
              >
                View
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</Layout>
