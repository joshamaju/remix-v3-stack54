<script lang="ts">
  import { routes } from "../../../routes";
  import Layout from "../../components/layout.svelte";
  import type { User } from "../../../app/models/users";

  export let targetUser: User;
</script>

<Layout>
  <h1>User Details</h1>

  <div class="card">
    <p>
      <strong>Name:</strong>
      {targetUser.name}
    </p>
    <p>
      <strong>Email:</strong>
      {targetUser.email}
    </p>
    <p>
      <strong>Role:</strong>{" "}
      <span
        class={`badge ${targetUser.role === "admin" ? "badge-info" : "badge-success"}`}
      >
        {targetUser.role}
      </span>
    </p>
    <p>
      <strong>Created:</strong>
      {targetUser.createdAt.toLocaleDateString()}
    </p>

    <div style="margin-top: 2rem;">
      <a
        class="btn"
        href={routes.admin.users.edit.href({ userId: targetUser.id })}
      >
        Edit
      </a>
      <a
        class="btn btn-secondary"
        style="margin-left: 0.5rem;"
        href={routes.admin.users.index.href()}
      >
        Back to List
      </a>
    </div>
  </div>
</Layout>
