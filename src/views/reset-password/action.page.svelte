<script lang="ts">
  import { routes } from "../../routes";
  import Document from "../components/document.entry.svelte";

  export let token: string;
  export let type: "credentials" | "failure";
</script>

<Document>
  <div class="card" style="max-width: 500px; margin: 2rem auto;">
    {#if type == "credentials"}
      <div class="alert alert-error">Passwords do not match.</div>
      <p>
        <a class="btn" href={routes.auth.resetPassword.index.href({ token })}>
          Try Again
        </a>
      </p>
    {:else if type == "failure"}
      <div class="alert alert-error">Invalid or expired reset token.</div>
      <p>
        <a href={routes.auth.forgotPassword.index.href()} class="btn">
          Request New Link
        </a>
      </p>
    {:else}
      <div class="alert alert-success">
        Password reset successfully! You can now login with your new password.
      </div>
      <p>
        <a href={routes.auth.login.index.href()} class="btn"> Login </a>
      </p>
    {/if}
  </div>
</Document>
