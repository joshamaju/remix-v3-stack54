<script>
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";
</script>

<Layout>
  <div class="card">
    <h1>Order Not Found</h1>
    <p>
      <a href={routes.account.orders.index.href()} class="btn">
        View My Orders
      </a>
    </p>
  </div>
</Layout>
