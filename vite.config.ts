import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: "certs/key.pem",
      cert: "certs/cert.pem",
    },
    port: 5173,
    host: "0.0.0.0",
  },
});
