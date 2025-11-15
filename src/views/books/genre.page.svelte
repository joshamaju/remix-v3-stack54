<script lang="ts">
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";
  import type { Book } from "../../app/models/books";
  import Frame from "../integrations/frame/frame.svelte";

  export let genre: string;
  export let books: Book[];
</script>

<Layout>
  <h1>{genre.charAt(0).toUpperCase() + genre.slice(1)} Books</h1>
  <p style="margin: 1rem 0;">
    <a class="btn btn-secondary" href={routes.books.index.href()}>
      View All Books
    </a>
  </p>

  <div class="grid" style="margin-top: 2rem;">
    {#each books as book}
      <Frame src={routes.fragments.bookCard.href({ slug: book.slug })}>
        <div>Loading...</div>
      </Frame>
    {/each}
  </div>
</Layout>
