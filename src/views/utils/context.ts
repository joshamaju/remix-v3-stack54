import { getAllContexts } from "svelte";

export function getContexts() {
  return Object.fromEntries(getAllContexts() ?? new Map());
}
