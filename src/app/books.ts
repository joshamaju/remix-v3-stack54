import type { RouteHandlers } from "@remix-run/fetch-router";

import { routes } from "../routes";

import { loadAuth } from "./middleware/auth";
import {
  getAllBooks,
  getAvailableGenres,
  getBookBySlug,
  getBooksByGenre,
} from "./models/books";
import { render } from "./utils/render";

export default {
  middleware: [loadAuth],
  handlers: {
    index() {
      let books = getAllBooks();
      let genres = getAvailableGenres();
      return render("books/index", { books, genres });
    },

    genre({ params }) {
      let genre = params.genre;
      let books = getBooksByGenre(genre);

      if (books.length === 0) {
        return render("books/genre-notfound", {}, { status: 404 });
      }

      return render("books/genre", { genre, books });
    },

    show({ params }) {
      let book = getBookBySlug(params.slug);

      if (!book) {
        return render("books/notfound", {}, { status: 404 });
      }

      return render("books/show", { book });
    },
  },
} satisfies RouteHandlers<typeof routes.books>;
