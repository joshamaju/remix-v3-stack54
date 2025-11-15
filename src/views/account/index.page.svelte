<script lang="ts">
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";
  import type { User } from "../../app/models/users";

  export let user: User;
</script>

<Layout>
  <h1>My Account</h1>

  <div class="card">
    <h2>Account Information</h2>
    <p>
      <strong>Name:</strong>
      {user.name}
    </p>
    <p>
      <strong>Email:</strong>
      {user.email}
    </p>
    <p>
      <strong>Role:</strong>
      {user.role}
    </p>
    <p>
      <strong>Member Since:</strong>
      {user.createdAt.toLocaleDateString()}
    </p>

    <p style="margin-top: 1.5rem;">
      <a href={routes.account.settings.index.href()} class="btn">
        Edit Settings
      </a>
    </p>
  </div>

  <div class="card" style="margin-top: 1.5rem;">
    <h2>Quick Links</h2>
    <p>
      <a href={routes.account.orders.index.href()} class="btn btn-secondary">
        View Orders
      </a>
      <a
        class="btn btn-secondary"
        style="margin-left: 0.5rem;"
        href={routes.books.index.href()}
      >
        Browse Books
      </a>
    </p>
  </div>
</Layout>
