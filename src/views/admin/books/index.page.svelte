<script lang="ts">
  import { routes } from "../../../routes";
  import Layout from "../../components/layout.svelte";
  import type { Book } from "../../../app/models/books";
  import RestfulForm from "../../components/restful-form.svelte";

  export let books: Book[];
</script>

<Layout>
  <h1>Manage Books</h1>

  <p style="margin-bottom: 1rem;">
    <a href={routes.admin.books.new.href()} class="btn"> Add New Book </a>
    <a
      class="btn btn-secondary"
      style="margin-left: 0.5rem;"
      href={routes.admin.index.href()}
    >
      Back to Dashboard
    </a>
  </p>

  <div class="card">
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each books as book}
          <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>${book.price.toFixed(2)}</td>
            <td>
              <span
                class={`badge ${book.inStock ? "badge-success" : "badge-warning"}`}
              >
                {book.inStock ? "Yes" : "No"}
              </span>
            </td>
            <td class="actions">
              <a
                class="btn btn-secondary"
                style="font-size: 0.875rem; padding: 0.25rem 0.5rem;"
                href={routes.admin.books.edit.href({ bookId: book.id })}
              >
                Edit
              </a>
              <RestfulForm
                method="DELETE"
                style="display: inline"
                action={routes.admin.books.destroy.href({ bookId: book.id })}
              >
                <button
                  type="submit"
                  class="btn btn-danger"
                  style="font-size: 0.875rem, padding: 0.25rem 0.5rem"
                >
                  Delete
                </button>
              </RestfulForm>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</Layout>
