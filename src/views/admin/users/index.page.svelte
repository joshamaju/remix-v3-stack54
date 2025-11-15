<script lang="ts">
  import { routes } from "../../../routes";
  import Layout from "../../components/layout.svelte";
  import type { User } from "../../../app/models/users";
  import RestfulForm from "../../components/restful-form.svelte";

  export let user: User;
  export let users: User[];
</script>

<Layout>
  <h1>Manage Users</h1>

  <p style="margin-bottom: 1rem;">
    <a class="btn btn-secondary" href={routes.admin.index.href()}>
      Back to Dashboard
    </a>
  </p>

  <div class="card">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each users as u}
          <tr>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>
              <span
                class={`badge ${u.role === "admin" ? "badge-info" : "badge-success"}`}
              >
                {u.role}
              </span>
            </td>
            <td>{u.createdAt.toLocaleDateString()}</td>
            <td class="actions">
              <a
                class="btn btn-secondary"
                style="font-size: 0.875rem; padding: 0.25rem 0.5rem;"
                href={routes.admin.users.edit.href({ userId: u.id })}
              >
                Edit
              </a>
              {#if u.id !== user.id}
                <RestfulForm
                  method="DELETE"
                  style="display: inline;"
                  action={routes.admin.users.destroy.href({ userId: u.id })}
                >
                  <button
                    type="submit"
                    class="btn btn-danger"
                    style="font-size: 0.875rem; padding: 0.25rem 0.5rem;"
                  >
                    Delete
                  </button>
                </RestfulForm>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</Layout>
