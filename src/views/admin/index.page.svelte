<script lang="ts">
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";
</script>

<Layout>
  <h1>Admin Dashboard</h1>

  <div
    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;"
  >
    <div class="card">
      <h2>Manage Books</h2>
      <p>Add, edit, or remove books from the catalog.</p>
      <a
        class="btn"
        style="margin-top: 1rem;"
        href={routes.admin.books.index.href()}
      >
        View Books
      </a>
    </div>

    <div class="card">
      <h2>Manage Users</h2>
      <p>View and manage user accounts.</p>
      <a
        class="btn"
        style="margin-top: 1rem;"
        href={routes.admin.users.index.href()}
      >
        View Users
      </a>
    </div>

    <div class="card">
      <h2>View Orders</h2>
      <p>Monitor and manage customer orders.</p>
      <a
        class="btn"
        style="margin-top: 1rem;"
        href={routes.admin.orders.index.href()}
      >
        View Orders
      </a>
    </div>
  </div>
</Layout>
