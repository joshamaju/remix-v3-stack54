<script lang="ts">
  import type { HTMLFormAttributes } from "svelte/elements";

  interface $$Props extends HTMLFormAttributes {
    /**
     * The name of the hidden <input> field that contains the method override value.
     * Default is `_method`.
     */
    methodOverrideField?: string;
  }

  export let method: $$Props["method"] = undefined;
  export let methodOverrideField: $$Props["methodOverrideField"] = "_method";
</script>

<form method="POST" {...$$restProps}>
  {#if method !== "POST"}
    <input type="hidden" name={methodOverrideField} value={method} />
  {/if}
  <slot />
</form>
