import type { UserConfig } from "npm:vite@5";
import denoJson from "./deno.json" assert { type: "json" };
import { fileURLToPath } from "node:url";
import path from "node:path";
const dir = path.resolve(fileURLToPath(import.meta.url), "..");

export default {
  cacheDir: "node_modules/.vite",
  resolve: {
    alias: transDenoImports(denoJson.imports, dir),
  },
  publicDir: "src/public",
} as UserConfig;

function transDenoImports(imports: Record<string, string>, base: string) {
  const newMap: Record<string, string> = {};
  for (const [k, v] of Object.entries(imports)) {
    if (v.startsWith(".")) {
      newMap[k] = path.resolve(base, v);
    } else newMap[k] = v;
  }
  return newMap;
}
