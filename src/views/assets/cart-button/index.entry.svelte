<script lang="ts">
  import { nanoid } from "nanoid";
  import CartButton from "../../components/cart-button.svelte";
  import { getContexts } from "../../utils/context";
  import { encode } from "../../utils/data";

  export let id: string;
  export let slug: string;
  export let inCart: boolean;

  const id_ = `cart_button_${nanoid()}`;

  const context = getContexts();
  const props = { id, slug, inCart };
</script>

<svelte:head>
  {@html encode({ props, context }, { id: id_ })}
  <script type="module" src="./script.ts"></script>
</svelte:head>

<demo-hydrator id={id_}>
  <CartButton {id} {slug} {inCart} />
</demo-hydrator>

<style>
  :global(body) {
    margin: 0;
  }
</style>
