<script lang="ts">
  import Layout from "../components/layout.svelte";

  export let isFrame: boolean | undefined = undefined;
</script>

{#if isFrame}
  <div class="card">
    <h1>Book Not Found</h1>
  </div>
{:else}
  <Layout>
    <div class="card">
      <h1>Book Not Found</h1>
    </div>
  </Layout>
{/if}
