import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/WAKS/",
  build: {
    sourcemap: false, // 🔹 disables source maps
  },
});
