<script lang="ts">
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";
  import type { Cart } from "../../app/models/cart";

  export let cart: Cart;
  export let total: number;
</script>

<Layout>
  <h1>Checkout</h1>

  <div class="card">
    <h2>Order Summary</h2>
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
        {#each cart.items as item}
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
          <td style="font-weight: bold;">${total.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  </div>

  <div class="card" style="margin-top: 1.5rem;">
    <h2>Shipping Information</h2>
    <form method="POST" action={routes.checkout.action.href()}>
      <div class="form-group">
        <label for="street">Street Address</label>
        <input type="text" id="street" name="street" required />
      </div>

      <div class="form-group">
        <label for="city">City</label>
        <input type="text" id="city" name="city" required />
      </div>

      <div class="form-group">
        <label for="state">State</label>
        <input type="text" id="state" name="state" required />
      </div>

      <div class="form-group">
        <label for="zip">ZIP Code</label>
        <input type="text" id="zip" name="zip" required />
      </div>

      <button type="submit" class="btn"> Place Order </button>
      <a
        class="btn btn-secondary"
        style="margin-left: 0.5rem;"
        href={routes.cart.index.href()}
      >
        Back to Cart
      </a>
    </form>
  </div>
</Layout>
