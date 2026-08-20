import path from "node:path";

/**
 * Finds shared docs from a novel package.
 *
 * It returns the relative path from the package to `config/docs`.
 */
export function createSharedDocsRoot(location: string): string {
  const configRoot: string = path.resolve(__dirname, "../../..");
  return path
    .relative(location, path.join(configRoot, "docs"))
    .replaceAll("\\", "/");
}
