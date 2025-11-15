<script lang="ts">
  import { routes } from "../../routes";
  import Document from "../components/document.entry.svelte";

  export let token: string;
</script>

<Document>
  <div class="card" style="max-width: 500px; margin: 2rem auto;">
    <h1>Reset Password</h1>
    <p>Enter your new password below.</p>

    <form
      method="POST"
      action={routes.auth.resetPassword.action.href({ token })}
    >
      <div class="form-group">
        <label for="password">New Password</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          autoComplete="new-password"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          required
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
        />
      </div>

      <button type="submit" class="btn"> Reset Password </button>
    </form>
  </div>
</Document>
