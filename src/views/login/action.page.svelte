<script>
  import { routes } from "../../routes";
  import Document from "../components/document.entry.svelte";
</script>

<Document>
  <div class="card" style="max-width: 500px; margin: 2rem auto;">
    <div class="alert alert-error">
      Invalid email or password. Please try again.
    </div>
    <p>
      <a href={routes.auth.login.index.href()} class="btn"> Back to Login </a>
    </p>
  </div>
</Document>
