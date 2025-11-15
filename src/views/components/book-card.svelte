<script lang="ts">
  import type { Book } from "../../app/models/books";
  import { routes } from "../../routes";
  import CartButton from "../assets/cart-button/index.entry.svelte";

  export let book: Book;
  export let inCart: boolean;
</script>

<div class="book-card">
  <img src={book.coverUrl} alt={book.title} />
  <div class="book-card-body">
    <h3>{book.title}</h3>
    <p class="author">by {book.author}</p>
    <p class="price">${book.price.toFixed(2)}</p>
    <div style="display: flex; gap: 0.5rem; align-items: center">
      <a href={routes.books.show.href({ slug: book.slug })} class="btn">
        View Details
      </a>

      <CartButton {inCart} id={book.id} slug={book.slug} />
    </div>
  </div>
</div>
