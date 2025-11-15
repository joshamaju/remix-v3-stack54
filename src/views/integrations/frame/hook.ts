import { getContext } from "svelte";

export function useFrame() {
  const frame = getContext("frame:current");

  if (!frame) {
    throw new Error("useFrame used outside a Frame");
  }

  const { id } = (frame ?? {}) as any;

  return {
    reload() {
      return new Promise<void>((resolve) => {
        function onReloaded(event: Event) {
          const e = event as CustomEvent;

          if (e.detail.id == id) {
            document.removeEventListener("frame:reloaded", onReloaded);
            resolve();
          }
        }

        document.addEventListener("frame:reloaded", onReloaded);

        const event = new CustomEvent("frame:reload", { detail: frame });

        document.dispatchEvent(event);
      });
    },
  };
}
