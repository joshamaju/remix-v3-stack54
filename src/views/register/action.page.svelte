<script>
  import { routes } from "../../routes";
  import Document from "../components/document.entry.svelte";
</script>

<Document>
  <div class="card" style="max-width: 500px; margin: 2rem auto;">
    <div class="alert alert-error">
      An account with this email already exists.
    </div>
    <p>
      <a href={routes.auth.register.index.href()} class="btn">
        Back to Register
      </a>
      <a
        class="btn btn-secondary"
        style="margin-left: 0.5rem;"
        href={routes.auth.login.index.href()}
      >
        Login
      </a>
    </p>
  </div>
</Document>
