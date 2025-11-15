import type { RouteHandlers } from "@remix-run/fetch-router";
import { redirect } from "@remix-run/fetch-router/response-helpers";

import { routes } from "../routes.js";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "./models/books.js";
import { render } from "./utils/render.js";

export default {
  index() {
    let books = getAllBooks();
    return render("admin/books/index", { books });
  },

  show({ params }) {
    let book = getBookById(params.bookId);

    if (!book) {
      return render("admin/books/notfound", {}, { status: 404 });
    }

    return render("admin/books/show", { book });
  },

  new() {
    return render("admin/books/new");
  },

  async create({ formData }) {
    createBook({
      slug: formData.get("slug")?.toString() ?? "",
      title: formData.get("title")?.toString() ?? "",
      author: formData.get("author")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      price: parseFloat(formData.get("price")?.toString() ?? "0"),
      genre: formData.get("genre")?.toString() ?? "",
      coverUrl: formData.get("cover")?.toString() ?? "/images/placeholder.jpg",
      imageUrls: [],
      isbn: formData.get("isbn")?.toString() ?? "",
      publishedYear: parseInt(
        formData.get("publishedYear")?.toString() ?? "2024",
        10
      ),
      inStock: formData.get("inStock")?.toString() === "true",
    });

    return redirect(routes.admin.books.index.href());
  },

  edit({ params }) {
    let book = getBookById(params.bookId);

    if (!book) {
      return render("admin/books/notfound", {}, { status: 404 });
    }

    return render("admin/books/edit", { book });
  },

  async update({ formData, params }) {
    let book = getBookById(params.bookId);
    if (!book) {
      return new Response("Book not found", { status: 404 });
    }

    // The uploadHandler automatically saves the file and returns the URL path
    // If no file was uploaded, the form field will be empty and we keep the existing coverUrl
    let coverUrl = formData.get("cover")?.toString() || book.coverUrl;

    updateBook(params.bookId, {
      slug: formData.get("slug")?.toString() ?? "",
      title: formData.get("title")?.toString() ?? "",
      author: formData.get("author")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      price: parseFloat(formData.get("price")?.toString() ?? "0"),
      genre: formData.get("genre")?.toString() ?? "",
      coverUrl,
      isbn: formData.get("isbn")?.toString() ?? "",
      publishedYear: parseInt(
        formData.get("publishedYear")?.toString() ?? "2024",
        10
      ),
      inStock: formData.get("inStock")?.toString() === "true",
    });

    return redirect(routes.admin.books.index.href());
  },

  destroy({ params }) {
    deleteBook(params.bookId);
    return redirect(routes.admin.books.index.href());
  },
} satisfies RouteHandlers<typeof routes.admin.books>;
