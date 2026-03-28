import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/WIP-Integrated-Dynamics-Project/",
  plugins: [vue()],
  resolve: {
    alias: {
      lib: fileURLToPath(new URL("./src/lib", import.meta.url)),
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
