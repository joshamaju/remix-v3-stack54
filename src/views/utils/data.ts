export function encode(data: any, { id }: { id: string }) {
  return `<script id="${id}" type="application/json">${JSON.stringify(
    data
  )}</script>`;
}

export function decode(id: string) {
  const element = document.getElementById(id);
  const content = element?.textContent;
  return content ? JSON.parse(content) : null;
}
