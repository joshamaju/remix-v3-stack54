<script lang="ts">
  import { routes } from "../routes";
  import type { Book } from "../app/models/books";
  import Layout from "./components/layout.svelte";
  import Frame from "./integrations/frame/frame.svelte";

  export let books: Book[];
  export let query: string | undefined;
</script>

<Layout>
  <h1>Search Results</h1>

  <div class="card" style="margin-bottom: 2rem;">
    <form
      method="GET"
      action={routes.search.href()}
      style="display: flex; gap: 0.5rem;"
    >
      <input
        name="q"
        type="search"
        value={query}
        placeholder="Search books..."
        style="flex: 1; padding: 0.5rem"
      />
      <button type="submit" class="btn"> Search </button>
    </form>
  </div>

  {#if query}
    <p style="margin-bottom: 1rem;">
      Found {books.length} result(s) for "{query}"
    </p>
  {/if}

  <div class="grid">
    {#if books.length > 0}
      {#each books as book}
        <Frame src={routes.fragments.bookCard.href({ slug: book.slug })} />
      {/each}
    {:else}
      <p>No books found matching your search.</p>
    {/if}
  </div>
</Layout>
