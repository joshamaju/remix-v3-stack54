<script lang="ts">
  import { routes } from "../../routes";
  import Document from "../components/document.entry.svelte";

  export let token: string;
</script>

<Document>
  <div class="card" style="max-width: 500px; margin: 2rem auto;">
    <div class="alert alert-success">
      Password reset link sent! Check your email.
    </div>

    {#if token}
      <div
        style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 4px;"
      >
        <p style="font-size: 0.9rem;">
          <strong>Demo Mode:</strong> Click the link below to reset your password
        </p>
        <p style="margin-top: 0.5rem;">
          <a
            class="btn btn-secondary"
            href={routes.auth.resetPassword.index.href({ token })}
          >
            Reset Password
          </a>
        </p>
      </div>
    {/if}

    <p style="margin-top: 1.5rem;">
      <a href={routes.auth.login.index.href()} class="btn"> Back to Login </a>
    </p>
  </div>
</Document>
