<script lang="ts">
  import { Head, LiveReload } from "stack54/components";
</script>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="../styles/global.css" />

    <script
      src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.js"
      integrity="sha384-ezjq8118wdwdRMj+nX4bevEi+cDLTbhLAeFF688VK8tPDGeLUe0WoY2MZtSla72F"
      crossorigin="anonymous"
    ></script>

    <Head />
    <LiveReload />

    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
