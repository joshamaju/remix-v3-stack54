<script>
  import { routes } from "../../routes";
  import Document from "../components/document.entry.svelte";
</script>

<Document>
  <div class="card" style="max-width: 500px; margin: 2rem auto;">
    <h1>Register</h1>
    <form method="POST" action={routes.auth.register.action.href()}>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required autoComplete="name" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          required
          id="email"
          type="email"
          name="email"
          autoComplete="email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          autoComplete="new-password"
        />
      </div>

      <button type="submit" class="btn"> Register </button>
    </form>

    <p style="margin-top: 1.5rem;">
      Already have an account? <a href={routes.auth.login.index.href()}
        >Login here</a
      >
    </p>
  </div>
</Document>
