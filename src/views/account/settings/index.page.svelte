<script lang="ts">
  import { routes } from "../../../routes";
  import Layout from "../../components/layout.svelte";
  import type { User } from "../../../app/models/users";
  import RestfulForm from "../../components/restful-form.svelte";

  export let user: User;
</script>

<Layout>
  <h1>Account Settings</h1>

  <div class="card">
    <RestfulForm method="PUT" action={routes.account.settings.update.href()}>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" value={user.name} required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          required
          id="email"
          type="email"
          name="email"
          value={user.email}
        />
      </div>

      <div class="form-group">
        <label for="password">New Password (leave blank to keep current)</label>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="new-password"
        />
      </div>

      <button type="submit" class="btn"> Update Settings </button>
      <a
        class="btn btn-secondary"
        style="margin-left: 0.5rem;"
        href={routes.account.index.href()}
      >
        Cancel
      </a>
    </RestfulForm>
  </div>
</Layout>
