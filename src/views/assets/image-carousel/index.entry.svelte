<script lang="ts">
  import { nanoid } from "nanoid";
  import ImageCarousel from "../../components/image-carousel.svelte";
  import { getContexts } from "../../utils/context";
  import { encode } from "../../utils/data";

  export let images: string[];
  export let startIndex: number = 0;

  const id = `image_carousel_${nanoid()}`;

  const context = getContexts();
  const props = { images, startIndex };
</script>

<svelte:head>
  {@html encode({ props, context }, { id })}
  <script type="module" src="./script.ts"></script>
</svelte:head>

<demo-hydrator {id}>
  <ImageCarousel {images} {startIndex} />
</demo-hydrator>
