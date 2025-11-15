<script>
  import { routes } from "../../../routes";
  import Layout from "../../components/layout.svelte";
</script>

<Layout>
  <h1>Add New Book</h1>

  <div class="card">
    <form
      method="POST"
      enctype="multipart/form-data"
      action={routes.admin.books.create.href()}
    >
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" required />
      </div>

      <div class="form-group">
        <label for="author">Author</label>
        <input type="text" id="author" name="author" required />
      </div>

      <div class="form-group">
        <label for="slug">Slug (URL-friendly name)</label>
        <input type="text" id="slug" name="slug" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description" required></textarea>
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" id="price" name="price" step="0.01" required />
      </div>

      <div class="form-group">
        <label for="genre">Genre</label>
        <input type="text" id="genre" name="genre" required />
      </div>

      <div class="form-group">
        <label for="isbn">ISBN</label>
        <input type="text" id="isbn" name="isbn" required />
      </div>

      <div class="form-group">
        <label for="publishedYear">Published Year</label>
        <input type="number" id="publishedYear" name="publishedYear" required />
      </div>

      <div class="form-group">
        <label for="inStock">In Stock</label>
        <select id="inStock" name="inStock">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div class="form-group">
        <label for="cover">Book Cover Image</label>
        <input type="file" id="cover" name="cover" accept="image/*" />
        <small style="color: #666;">
          Optional. Upload a cover image for this book.
        </small>
      </div>

      <button type="submit" class="btn"> Create Book </button>
      <a
        class="btn btn-secondary"
        style="margin-left: 0.5rem;"
        href={routes.admin.books.index.href()}
      >
        Cancel
      </a>
    </form>
  </div>
</Layout>
