import { routes } from "../../routes";

import { resolver } from "../../utils/view";
import { SESSION_ID_KEY } from "../middleware/auth";
import { getBookBySlug } from "../models/books";
import { getCart } from "../models/cart";
import { getStorage } from "./context";

export async function resolveFrame(
  frameSrc: string,
  { id, context }: { context?: Map<string, any>; id: string }
) {
  let url = new URL(frameSrc, "http://localhost:5173");

  const ctx = new Map(context);

  ctx.set("frame:parent", id);

  let bookCardMatch = routes.fragments.bookCard.match(url);

  if (bookCardMatch) {
    let slug = bookCardMatch.params.slug;
    let book = getBookBySlug(slug);

    if (!book) {
      throw new Error(`Book not found: ${slug}`);
    }

    let cart = getCart(getStorage().get(SESSION_ID_KEY));
    let inCart = cart.items.some((item) => item.slug === slug);

    const template = resolver("components/book-card.svelte");

    const out = template.render({ book, inCart }, { context: ctx });

    // Simulate network latency when resolving frames
    // await new Promise((resolve) => setTimeout(resolve, 500))

    return out;
  }

  throw new Error(`Failed to fetch ${frameSrc}`);
}
