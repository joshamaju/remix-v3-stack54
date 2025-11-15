<script lang="ts">
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";
  import type { Book } from "../../app/models/books";
  import Frame from "../integrations/frame/frame.svelte";

  export let books: Book[];
  export let genres: Book["genre"][];
</script>

<Layout>
  <h1>Browse Books</h1>

  <div class="card" style="margin-bottom: 2rem;">
    <form
      method="GET"
      action={routes.search.href()}
      style="display: flex; gap: 0.5rem;"
    >
      <input
        name="q"
        type="search"
        style="flex: 1, padding: 0.5rem"
        placeholder="Search books by title, author, or description..."
      />
      <button type="submit" class="btn"> Search </button>
    </form>
  </div>

  <div class="card" style="margin-bottom: 2rem;">
    <h3>Browse by Genre</h3>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem;">
      {#each genres as genre}
        <a href={routes.books.genre.href({ genre })} class="btn btn-secondary">
          {genre}
        </a>
      {/each}
    </div>
  </div>

  <div class="grid">
    {#each books as book}
      <Frame src={routes.fragments.bookCard.href({ slug: book.slug })}>
        <div>Loading...</div>
      </Frame>
    {/each}
  </div>
</Layout>
