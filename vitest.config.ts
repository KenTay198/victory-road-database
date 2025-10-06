import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@character": path.resolve(__dirname, "./src/domain/character"),
      "@hissatsu": path.resolve(__dirname, "./src/domain/hissatsu"),
      "@meta": path.resolve(__dirname, "./src/domain/meta"),
      "@settings": path.resolve(__dirname, "./src/domain/settings"),
      "@infrastructure": path.resolve(__dirname, "./src/infrastructure"),
      "@domain": path.resolve(__dirname, "./src/domain"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    coverage: {
      exclude: [
        "**/*types.ts",
        "**/*.d.ts",
        "**/*.config.*",
        ".scripts",
        "src/types",
        "src/translations",
        "old",
        "node_modules/**",
        ".next/**",
      ],
    },
  },
});
