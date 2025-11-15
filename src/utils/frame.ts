export function makeFrameId(src: string) {
  return `frame_${src.replaceAll("/", "_")}`;
}
