class Frame extends HTMLElement {
  #onReload = (event: Event) => {
    const e = event as CustomEvent;

    const detail = structuredClone(e.detail);

    const id = detail.id;

    const self_id = this.getAttribute("id")!;

    if (detail.id == self_id) {
      e.stopImmediatePropagation();

      // @ts-expect-error
      const htmx = window.htmx;

      const src = this.getAttribute("hx-get")!;

      const onLoad = function (e: CustomEvent) {
        const { path } = e.detail.requestConfig;

        if (path == src) {
          htmx.off("htmx:afterSettle", onLoad);
          const config = { detail: { id } };
          const event = new CustomEvent("frame:reloaded", config);
          document.dispatchEvent(event);
        }
      };

      htmx.on("htmx:afterSettle", onLoad);

      htmx.trigger(`#${self_id}`, "frame:htmx-reload");
    }
  };

  connectedCallback() {
    document.addEventListener("frame:reload", this.#onReload);
  }

  disconnectedCallback() {
    document.removeEventListener("frame:reload", this.#onReload);
  }
}

if (!customElements.get("x-frame")) {
  customElements.define("x-frame", Frame);
}

export {};
