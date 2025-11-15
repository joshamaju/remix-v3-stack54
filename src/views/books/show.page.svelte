<script lang="ts">
  import { routes } from "../../routes";
  import Layout from "../components/layout.svelte";
  import type { Book } from "../../app/models/books";
  import ImageCarousel from "../assets/image-carousel/index.entry.svelte";

  export let book: Book;
</script>

<Layout>
  <div style="display: grid; grid-template-columns: 300px 1fr; gap: 2rem;">
    <div
      style="
      height: 400px;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      "
    >
      <ImageCarousel images={book.imageUrls} />
    </div>

    <div class="card">
      <h1>{book.title}</h1>
      <p class="author" style="font-size: 1.2rem; margin: 0.5rem 0;">
        by {book.author}
      </p>

      <p style="margin: 1rem 0;">
        <span class="badge badge-info">{book.genre}</span>
        <span
          style="margin-left: 0.5rem;"
          class={`badge ${book.inStock ? "badge-success" : "badge-warning"}`}
        >
          {book.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </p>

      <p class="price" style="font-size: 2rem; margin: 1rem 0;">
        ${book.price.toFixed(2)}
      </p>

      <p style="margin: 1.5rem 0; line-height: 1.8;">{book.description}</p>

      <div
        style="margin: 1.5rem 0; padding: 1rem; background: #f8f9fa; border-radius: 4px;"
      >
        <p>
          <strong>ISBN:</strong>
          {book.isbn}
        </p>
        <p>
          <strong>Published:</strong>
          {book.publishedYear}
        </p>
      </div>

      {#if book.inStock}
        <form
          method="POST"
          style="margin-top: 2rem;"
          action={routes.cart.api.add.href()}
        >
          <input type="hidden" name="bookId" value={book.id} />
          <input type="hidden" name="slug" value={book.slug} />
          <button
            class="btn"
            type="submit"
            style="font-size: 1.1rem; padding: 0.75rem 1.5rem;"
          >
            Add to Cart
          </button>
        </form>
      {:else}
        <p style="color: #e74c3c; font-weight: 500;">
          This book is currently out of stock.
        </p>
      {/if}

      <p style="margin-top: 1.5rem;">
        <a href={routes.books.index.href()} class="btn btn-secondary">
          Back to Books
        </a>
      </p>
    </div>
  </div>
</Layout>
