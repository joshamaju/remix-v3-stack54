<script lang="ts">
  import { routes } from "../../../routes";
  import Layout from "../../components/layout.svelte";
  import type { User } from "../../../app/models/users";
  import RestfulForm from "../../components/restful-form.svelte";

  export let targetUser: User;
</script>

<Layout>
  <h1>Edit User</h1>

  <div class="card">
    <RestfulForm
      method="PUT"
      action={routes.admin.users.update.href({ userId: targetUser.id })}
    >
      <div class="form-group">
        <label for="name">Name</label>
        <input
          required
          id="name"
          type="text"
          name="name"
          value={targetUser.name}
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          required
          id="email"
          type="email"
          name="email"
          value={targetUser.email}
        />
      </div>

      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" name="role">
          <option value="customer" selected={targetUser.role === "customer"}>
            Customer
          </option>
          <option value="admin" selected={targetUser.role === "admin"}>
            Admin
          </option>
        </select>
      </div>

      <button type="submit" class="btn"> Update User </button>
      <a
        class="btn btn-secondary"
        style="margin-left: 0.5rem;"
        href={routes.admin.users.index.href()}
      >
        Cancel
      </a>
    </RestfulForm>
  </div>
</Layout>
