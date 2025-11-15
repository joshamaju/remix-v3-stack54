<script>
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";
</script>

<Layout>
  <div class="card">
    <h1>Checkout</h1>
    <p>Your cart is empty. Add some books before checking out.</p>
    <p style="margin-top: 1rem;">
      <a href={routes.books.index.href()} class="btn"> Browse Books </a>
    </p>
  </div>
</Layout>
