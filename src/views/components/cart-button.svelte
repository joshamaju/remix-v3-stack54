<script lang="ts">
  import { routes } from "../../routes";
  import { useFrame } from "../integrations/frame/hook";

  export let id: string;
  export let slug: string;
  export let inCart: boolean;

  const frame = useFrame();

  let route = inCart ? routes.cart.api.remove : routes.cart.api.add;
  let method = route.method;
  let action = route.href();

  let updating = false;

  let controller = new AbortController();
</script>

<form
  {method}
  {action}
  on:submit={async (event) => {
    event.preventDefault();

    updating = true;

    controller.abort();

    controller = new AbortController();

    await fetch(action, {
      method,
      signal: controller.signal,
      body: new FormData(event.currentTarget),
    });

    if (controller.signal.aborted) return;

    await frame.reload();

    if (controller.signal.aborted) return;

    updating = false;
  }}
>
  <input type="hidden" name="bookId" value={id} />
  <input type="hidden" name="slug" value={slug} />
  <input type="hidden" name="redirect" value="none" />
  <button type="submit" class="btn" style="opacity: {updating ? 0.5 : 1}">
    {inCart ? "Remove from Cart" : "Add to Cart"}
  </button>
</form>
