<script lang="ts">
  import { getContext } from "svelte";
  import type { HTMLIframeAttributes } from "svelte/elements";
  import { makeFrameId } from "../../../utils/frame";

  type Framer = {
    make(src: string, parent?: string, context?: object): string;
  };

  interface $$Props extends HTMLIframeAttributes {}

  const src = $$props.src as string;

  const id_ = makeFrameId(src);

  const context = { id: id_, src };

  const parent = getContext<string>("frame:parent");

  const frame = getContext<Framer>("frame");

  const id = frame.make(src, parent, context);
</script>

<svelte:head>
  <script type="module" src="./web-component.ts"></script>
</svelte:head>

<x-frame
  id={id_}
  hx-get={src}
  hx-swap="innerHTML"
  hx-trigger="frame:htmx-reload"
>
  <frame-slot {id} data-await-fallback={id}>
    <slot />
  </frame-slot>
</x-frame>
