<script>
  import { routes } from "../routes";
  import Layout from "./components/layout.svelte";
  import Frame from "./integrations/frame/frame.svelte";
</script>

<Layout>
  <div class="card">
    <h1>Welcome to the Bookstore</h1>
    <p style="margin: 1rem 0;">
      Discover your next favorite book from our curated collection of fiction,
      non-fiction, and more.
    </p>
    <p>
      <a href={routes.books.index.href()} class="btn"> Browse Books </a>
    </p>
  </div>

  <h2 style="margin: 2rem 0 1rem;">Featured Books</h2>
  <div class="grid">
    <Frame src={routes.fragments.bookCard.href({ slug: "bbq" })} />
    <Frame src={routes.fragments.bookCard.href({ slug: "heavy-metal" })} />
    <Frame src={routes.fragments.bookCard.href({ slug: "three-ways" })} />
  </div>
</Layout>
