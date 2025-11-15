import { HEAD_INSERTION_MARKER } from "stack54/runtime/internals";
import type { Output, Template } from "stack54/types";

type Args = Parameters<Template["render"]>;

type Props = NonNullable<Args[0]>;

type ResolverOptions = { id: string; context?: Map<string, any> };

type FrameResolver = (
  src: string,
  opts?: ResolverOptions,
  ctx?: object
) => Promise<Output>;

type Options = NonNullable<Args[1]> & { resolveFrame: FrameResolver };

type Chunk = { id: string | number; content: Output | string };

type Child = { id: string; promise: Promise<Output>; src: string };

async function defaultFrameResolver(): Promise<Output> {
  throw new Error("No resolveFrame provided");
}

const swap_script = `
  <script data-await-swap-script>
    window.__AWAIT_SWAP__ = function (id) {
    var script = document.querySelector('[data-await-swap-init-script="' + id + '"]')
    var template = document.querySelector('[data-await="' + id + '"]');
    var fallback = document.querySelector('[data-await-fallback="' + id + '"]');
    fallback.replaceWith(template.content);
    template.remove();
    script.remove();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    var patcher = document.querySelector('[data-await-swap-script]');
    patcher.remove();
  })
  </script>
  `;

const head_insert_script = `
  <script data-head-insert-script>
    window.__HEAD_INSERT__ = function (id) {
    var head = document.querySelector('head');
    var script = document.querySelector('[data-head-command="' + id + '"]')
    var template = document.querySelector('[data-head-segment="' + id + '"]');
    head.append(template.content);
    template.remove();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    var patcher = document.querySelector('[data-head-insert-script]');
    patcher.remove();
  })
  </script>
  `;

const renderChunk = ({ id, content }: Chunk) => {
  return `
  <template data-await="${id}">${content}</template>
  <script data-await-swap-init-script="${id}">window.__AWAIT_SWAP__(${id});</script>
  `;
};

const renderHead = ({ id, content }: Chunk) => {
  return `
  <template data-head-segment="${id}">${content}</template>
  <script data-head-command="${id}">window.__HEAD_INSERT__(${id});</script>

  <script data-head-command-remover="${id}">
  document.addEventListener('DOMContentLoaded', () => {
    var cmd = document.querySelector('[data-head-command="${id}"]');
    var rm = document.querySelector('[data-head-command-remover="${id}"]');
    cmd.remove();
    rm.remove();
  })
  </script>
  `;
};

function style(code: string) {
  return `<style>${code}</style>`;
}

export function renderToStream(
  template: Template,
  props?: Props,
  opts?: Options
) {
  let current_id = 0;
  const pending = new Set<Chunk["id"]>();
  const chunks = new Map<string, Output>();
  const childrens = new Map<string, Child[]>();
  const promises = new Map<string, Promise<Output>>();

  const resolveFrame = opts?.resolveFrame ?? defaultFrameResolver;

  let controller: ReadableStreamDefaultController<Chunk>;

  const stream = new ReadableStream<Chunk>({
    start(control) {
      controller = control;
    },
  });

  const context = new Map(opts?.context);

  const make = (src: string, parent?: string, frame_context?: object) => {
    const id = (current_id++).toString();

    pending.add(id);

    (async function () {
      try {
        const ctx = new Map(context);

        ctx.set("frame:current", frame_context);

        const base_promise = resolveFrame(src, { id, context: ctx });

        if (parent) {
          const children = childrens.get(parent) ?? [];
          childrens.set(parent, [
            ...children,
            { id, src, promise: base_promise },
          ]);
        }

        const parent_promise =
          parent !== undefined ? promises.get(parent) : undefined;

        let reject: (error: any) => void = () => {};

        const promise = new Promise<Output>((resolve, reject_) => {
          reject = reject_;

          if (!parent_promise) {
            resolve(base_promise);
            return;
          }

          // Await the parent before resolving the child.
          // This ensures the parent is sent to the client first.
          parent_promise.then(() => resolve(base_promise));
        });

        base_promise
          .then((output) => {
            chunks.set(id, output);
          })
          .catch(reject);

        promises.set(id, promise);

        let children = childrens.get(id);

        let blocker: Promise<any> = promise;

        if (children) {
          blocker = Promise.all(children.map((_) => _.promise));
        }

        await blocker;

        children = childrens.get(id);

        if (children) {
          const children_ = await Promise.all(
            children.map(async (_) => {
              const output = await _.promise;
              return { ..._, output };
            })
          );

          const chunk = await base_promise;

          if (chunk) {
            let css = chunk.css;
            let html = chunk.html;
            let head = chunk.head;

            for (const { id, output: o } of children_) {
              const regex = new RegExp(
                `<frame-slot\\s+id=["']${id}["']\\s+data-await-fallback=["']${id}["']>(.*?)<\\/frame-slot>`,
                "gs"
              );

              head = head + o.head;
              html = html.replace(regex, o.html);
              css = { map: css.map + o.css, code: css.code + o.css.code };
            }

            chunks.set(id, { ...chunk, css, head, html });
          }
        }

        try {
          const value = await promise;
          const chunk = chunks.get(id) ?? value;
          controller.enqueue({ id, content: chunk });
        } catch (error) {
          controller.enqueue({ id, content: String(error) });
        }
      } catch (error) {
        controller.enqueue({ id, content: String(error) });
      }
    })();

    return id.toString();
  };

  context.set("frame", { make });

  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      const cleanup = () => controller.close();

      const out = template.render(props, { ...opts, context });

      const head =
        out.head + style(out.css.code) + swap_script + head_insert_script;

      const html = out.html.replace(HEAD_INSERTION_MARKER, head);

      controller.enqueue(encoder.encode(html));

      // Immediately close the stream if Frame is not used.
      if (pending.size <= 0) cleanup();

      for await (const { id, content } of stream) {
        pending.delete(id);

        if (typeof content == "string") {
          const body = renderChunk({ id, content });
          controller.enqueue(encoder.encode(body));
        } else {
          const part = `${style(content.css.code)}${content.head}`;
          const head = renderHead({ id, content: part });
          const body = renderChunk({ id, content: content.html });
          controller.enqueue(encoder.encode(`${head}${body}`));
        }

        if (pending.size <= 0) cleanup();
      }
    },
  });
}
