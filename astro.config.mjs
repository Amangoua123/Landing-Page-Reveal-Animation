import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
