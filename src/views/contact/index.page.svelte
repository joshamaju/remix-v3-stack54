<script>
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";
</script>

<Layout>
  <div class="card">
    <h1>Contact Us</h1>
    <p style="margin: 1rem 0;">
      Have a question or feedback? We'd love to hear from you!
    </p>

    <form method="POST" action={routes.contact.action.href()}>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" required></textarea>
      </div>

      <button type="submit" class="btn"> Send Message </button>
    </form>
  </div>
</Layout>
