<script lang="ts">
  import { routes } from "../../routes";
  import Document from "./document.entry.svelte";
  import type { User } from "../../app/models/users";
  import { getCurrentUser } from "../../app/utils/context";

  let user: User | null = null;
  try {
    user = getCurrentUser();
  } catch {
    // user not authenticated
  }
</script>

<Document>
  <slot slot="head" name="head" />

  <header>
    <div class="container">
      <h1>
        <a href={routes.home.href()}>📚 Bookstore</a>
      </h1>
      <nav>
        <a href={routes.home.href()}>Home</a>
        <a href={routes.books.index.href()}>Books</a>
        <a href={routes.about.href()}>About</a>
        <a href={routes.contact.index.href()}>Contact</a>
        <a href={routes.cart.index.href()}>Cart</a>
        {#if user}
          <a href={routes.account.index.href()}>Account</a>
          {#if user.role === "admin"}
            <a href={routes.admin.index.href()}>Admin</a>
          {/if}
          <form
            method="POST"
            style="display: inline"
            action={routes.auth.logout.href()}
          >
            <button
              type="submit"
              class="btn btn-secondary"
              style="margin-left: 1rem"
            >
              Logout
            </button>
          </form>
        {:else}
          <a href={routes.auth.login.index.href()}>Login</a>
          <a href={routes.auth.register.index.href()}>Register</a>
        {/if}
      </nav>
    </div>
  </header>
  <main>
    <div class="container">
      <slot />
    </div>
  </main>
  <footer>
    <div class="container">
      <p>&copy; {new Date().getFullYear()} Bookstore Demo. Built with Remix.</p>
    </div>
  </footer>
</Document>
