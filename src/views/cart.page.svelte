<script lang="ts">
  import { routes } from "../routes";
  import type { Cart } from "../app/models/cart";
  import type { User } from "../app/models/users";
  import Layout from "./components/layout.svelte";
  import RestfulForm from "./components/restful-form.svelte";

  export let cart: Cart;
  export let total: number;
  export let user: User | undefined;
</script>

<Layout>
  <h1>Shopping Cart</h1>

  <div class="card">
    {#if cart.items.length > 0}
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each cart.items as item}
            <tr>
              <td>
                <a href={routes.books.show.href({ slug: item.slug })}>
                  {item.title}
                </a>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <RestfulForm
                  method="PUT"
                  action={routes.cart.api.update.href()}
                  style="display: inline-flex; gap: 0.5rem; align-items: center;"
                >
                  <input type="hidden" name="bookId" value={item.bookId} />
                  <input
                    min="1"
                    type="number"
                    name="quantity"
                    style="width: 70px;"
                    value={item.quantity}
                  />
                  <button
                    type="submit"
                    class="btn btn-secondary"
                    style="font-size: 0.875rem; padding: 0.25rem 0.5rem;"
                  >
                    Update
                  </button>
                </RestfulForm>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <RestfulForm
                  method="DELETE"
                  style="display: inline;"
                  action={routes.cart.api.remove.href()}
                >
                  <input type="hidden" name="bookId" value={item.bookId} />
                  <button
                    type="submit"
                    class="btn btn-danger"
                    style="font-size: 0.875rem; padding: 0.25rem 0.5rem;"
                  >
                    Remove
                  </button>
                </RestfulForm>
              </td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style="text-align: right; font-weight: bold;">
              Total:
            </td>
            <td style="font-weight: bold;">${total.toFixed(2)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <div style="margin-top: 2rem; display: flex; gap: 1rem;">
        <a href={routes.books.index.href()} class="btn btn-secondary">
          Continue Shopping
        </a>
        {#if user}
          <a href={routes.checkout.index.href()} class="btn">
            Proceed to Checkout
          </a>
        {:else}
          <a href={routes.auth.login.index.href()} class="btn">
            Login to Checkout
          </a>
        {/if}
      </div>
    {:else}
      <p>Your cart is empty.</p>
      <p style="margin-top: 1rem;">
        <a href={routes.books.index.href()} class="btn"> Browse Books </a>
      </p>
    {/if}
  </div>
</Layout>
