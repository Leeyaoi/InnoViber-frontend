import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: "./innoviber-privateKey.key",
      cert: "./innoviber.crt",
    },
  },
  plugins: [react()],
});
