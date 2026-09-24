/** Resolve local media for root hosting or a GitHub Pages subdirectory. */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
