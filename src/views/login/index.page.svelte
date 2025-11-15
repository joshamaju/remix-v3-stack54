<script>
  import { routes } from "../../routes";
  import Document from "../components/document.entry.svelte";
</script>

<Document>
  <div class="card" style="max-width: 500px; margin: 2rem auto;">
    <h1>Login</h1>
    <form method="POST" action={routes.auth.login.action.href()}>
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
          autoComplete="current-password"
        />
      </div>

      <button type="submit" class="btn"> Login </button>
    </form>

    <p style="margin-top: 1.5rem;">
      Don't have an account? <a href={routes.auth.register.index.href()}
        >Register here</a
      >
    </p>
    <p>
      <a href={routes.auth.forgotPassword.index.href()}>Forgot password?</a>
    </p>

    <div
      style="margin-top: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 4px;"
    >
      <p style="font-size: 0.9rem;">
        <strong>Demo Accounts:</strong>
      </p>
      <p style="font-size: 0.9rem;">Admin: admin@bookstore.com / admin123</p>
      <p style="font-size: 0.9rem;">
        Customer: customer@example.com / password123
      </p>
    </div>
  </div>
</Document>
