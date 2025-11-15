<script lang="ts">
  import type { Book } from "../../../app/models/books";
  import { routes } from "../../../routes";
  import Layout from "../../components/layout.svelte";
  export let book: Book;
</script>

<Layout>
  <h1>Book Details</h1>

  <div class="card">
    <p>
      <strong>Title:</strong>
      {book.title}
    </p>
    <p>
      <strong>Author:</strong>
      {book.author}
    </p>
    <p>
      <strong>Slug:</strong>
      {book.slug}
    </p>
    <p>
      <strong>Description:</strong>
      {book.description}
    </p>
    <p>
      <strong>Price:</strong> ${book.price.toFixed(2)}
    </p>
    <p>
      <strong>Genre:</strong>
      {book.genre}
    </p>
    <p>
      <strong>ISBN:</strong>
      {book.isbn}
    </p>
    <p>
      <strong>Published:</strong>
      {book.publishedYear}
    </p>
    <p>
      <strong>In Stock:</strong>{" "}
      <span class={`badge ${book.inStock ? "badge-success" : "badge-warning"}`}>
        {book.inStock ? "Yes" : "No"}
      </span>
    </p>

    <div style="margin-top: 2rem;">
      <a href={routes.admin.books.edit.href({ bookId: book.id })} class="btn">
        Edit
      </a>
      <a
        class="btn btn-secondary"
        style="margin-left: 0.5rem;"
        href={routes.admin.books.index.href()}
      >
        Back to List
      </a>
    </div>
  </div>
</Layout>
