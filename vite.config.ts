import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const rawBase = process.env.PAGES_BASE || "/";
const base = rawBase === "/" ? "/" : `/${rawBase.replace(/^\/+|\/+$/g, "")}/`;

export default defineConfig({
  base,
  plugins: [vue()],
  resolve: {
    alias: {
      lib: fileURLToPath(new URL("./src/lib", import.meta.url)),
      "pages-lib": fileURLToPath(new URL("./src/pages/lib", import.meta.url)),
      "re2-wasm": fileURLToPath(
        new URL("./src/shims/re2-browser.ts", import.meta.url)
      ),
    },
  },
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/index.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/index.css";
          }

          return "assets/[name][extname]";
        },
      },
    },
  },
});
