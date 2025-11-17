import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "common"),
      "@features": path.resolve(__dirname, "features"),
      "@app": path.resolve(__dirname, "app"),
    },
  },
  css: {
    modules: {
      localsConvention: "dashesOnly", // или 'camelCaseOnly', 'dashes', 'camelCase'
      generateScopedName: "[name]__[local]___[hash:base64:5]", // формат: ComponentName_className_hash
    },
  },
});
