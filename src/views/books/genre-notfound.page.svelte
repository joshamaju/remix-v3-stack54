<script lang="ts">
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";

  export let genre: string;
</script>

<Layout>
  <div class="card">
    <h1>Genre Not Found</h1>
    <p>No books found in the "{genre}" genre.</p>
    <p style="margin-top: 1rem;">
      <a class="btn" href={routes.books.index.href()}> Browse All Books </a>
    </p>
  </div>
</Layout>
