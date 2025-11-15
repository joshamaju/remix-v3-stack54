<script lang="ts">
  export let images: string[];
  export let startIndex: number = 0;

  let index = startIndex;

  let goPrev = (_: number) => {
    if (index <= 0) return;
    index = index - 1;
  };

  let goNext = (total: number) => {
    if (index >= total - 1) return;
    index = index + 1;
  };

  let total = images.length;

  if (index > total - 1) index = total - 1;
  if (index < 0) index = 0;
</script>

{#if total !== 0}
  <div
    style="
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: #f5f5f5;
    "
  >
    <div
      style="
      width: 100%;
      height: 100%;
      display: flex;
      will-change: transform;
      transform: translateX(-${index * 100}%);
      transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
      "
    >
      {#each images as src, i}
        <div
          style="
          height: 100%;
          minWidth: 100%;
          position: relative;
          "
        >
          <img
            {src}
            draggable={false}
            alt={`Image ${i + 1} of ${total}`}
            style="
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            user-select: none;
            pointer-events: none;
            "
          />
        </div>
      {/each}
    </div>

    <button
      disabled={index === 0}
      aria-label="Previous image"
      on:click={() => goPrev(total)}
      style="
      top: 50%;
      left: 8px;
      width: 40px;
      height: 40px;
      color: white;
      border: none;
      outline: none;
      display: flex;
      cursor: pointer;
      position: absolute;
      align-items: center;
      border-radius: 999px;
      justify-content: center;
      background: transparent;
      transform: translateY(-50%);
      opacity: {index === 0 ? 0.4 : 0.9};
      transition: background-color 150ms ease, opacity 150ms ease;
      "
    >
      <span style="font-size: 22px; line-height: 1">{"‹"}</span>
    </button>

    <button
      aria-label="Next image"
      disabled={index === total - 1}
      on:click={() => goNext(total)}
      style="
      top: 50%;
      right: 8px;
      width: 40px;
      border: none;
      color: white;
      height: 40px;
      display: flex;
      outline: none;
      cursor: pointer;
      position: absolute;
      align-items: center;
      border-radius: 999px;
      justify-content: center;
      background: transparent;
      transform: translateY(-50%);
      opacity: {index === total - 1 ? 0.4 : 0.9};
      transition: background-color 150ms ease, opacity 150ms ease;
      "
    >
      <span style="font-size: 22px; line-height: 1">{"›"}</span>
    </button>
  </div>
{/if}
