<script>
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";
</script>

<Layout>
  <div class="alert alert-success">
    Thank you for your message! We'll get back to you soon.
  </div>
  <div class="card">
    <p>
      <a href={routes.home.href()} class="btn"> Return Home </a>
    </p>
  </div>
</Layout>
