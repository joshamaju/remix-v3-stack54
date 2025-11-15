<script lang="ts">
  import { routes } from "../../../routes";
  import Layout from "../../components/layout.svelte";
  import type { Book } from "../../../app/models/books";
  import RestfulForm from "../../components/restful-form.svelte";

  export let book: Book;
</script>

<Layout>
  <h1>Edit Book</h1>

  <div class="card">
    <RestfulForm
      method="PUT"
      enctype="multipart/form-data"
      action={routes.admin.books.update.href({ bookId: book.id })}
    >
      <div class="form-group">
        <label for="title">Title</label>
        <input
          required
          id="title"
          type="text"
          name="title"
          value={book.title}
        />
      </div>

      <div class="form-group">
        <label for="author">Author</label>
        <input
          required
          type="text"
          id="author"
          name="author"
          value={book.author}
        />
      </div>

      <div class="form-group">
        <label for="slug">Slug (URL-friendly name)</label>
        <input type="text" id="slug" name="slug" value={book.slug} required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description" required>
          {book.description}
        </textarea>
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          required
          id="price"
          step="0.01"
          name="price"
          type="number"
          value={book.price}
        />
      </div>

      <div class="form-group">
        <label for="genre">Genre</label>
        <input
          required
          id="genre"
          type="text"
          name="genre"
          value={book.genre}
        />
      </div>

      <div class="form-group">
        <label for="isbn">ISBN</label>
        <input type="text" id="isbn" name="isbn" value={book.isbn} required />
      </div>

      <div class="form-group">
        <label for="publishedYear">Published Year</label>
        <input
          required
          type="number"
          id="publishedYear"
          name="publishedYear"
          value={book.publishedYear}
        />
      </div>

      <div class="form-group">
        <label for="inStock">In Stock</label>
        <select id="inStock" name="inStock">
          <option value="true" selected={book.inStock}> Yes </option>
          <option value="false" selected={!book.inStock}> No </option>
        </select>
      </div>

      <div class="form-group">
        <label for="cover">Book Cover Image</label>
        {#if book.coverUrl !== "/images/placeholder.jpg"}
          <div style="margin-bottom: 0.5rem;">
            <img
              alt={book.title}
              src={book.coverUrl}
              style="max-width: 200px; height: auto; border-radius: 4px;"
            />
            <p style="font-size: 0.875rem; color: #666;">Current cover image</p>
          </div>
        {/if}
        <input type="file" id="cover" name="cover" accept="image/*" />
        <small style="color: #666;">
          Optional. Upload a new cover image to replace the current one.
        </small>
      </div>

      <button type="submit" class="btn"> Update Book </button>
      <a
        class="btn btn-secondary"
        style="margin-left: 0.5rem;"
        href={routes.admin.books.index.href()}
      >
        Cancel
      </a>
    </RestfulForm>
  </div>
</Layout>
