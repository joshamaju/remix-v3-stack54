/**
 *
 * @returns {import("vite").Plugin}
 */
export function logger() {
  return {
    name: "logger",
    buildEnd(error) {
      console.log(error);
    },
  };
}
