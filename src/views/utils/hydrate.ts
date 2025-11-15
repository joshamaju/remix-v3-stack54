import type { ComponentConstructorOptions, SvelteComponent } from "svelte";
import { decode } from "./data";
// import { decode } from "stack54/data";

interface Component {
  new (args: ComponentConstructorOptions): SvelteComponent;
}

const name = "demo-hydrator";

export function hydrate(component: Component) {
  class Base extends HTMLElement {
    connectedCallback() {
      const id = this.getAttribute("id");

      let props_: any = {};

      if (id) {
        try {
          props_ = decode(id);
        } catch (error) {}
      }

      const { props, context } = props_;

      // console.log(props_);

      new component({
        props,
        target: this,
        hydrate: true,
        context: new Map(Object.entries(context)),
      });
    }
  }

  if (!customElements.get(name)) {
    customElements.define(name, Base);
  }
}
