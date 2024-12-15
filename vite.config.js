import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/robots": "http://localhost:8000",
      "/ws/robots": {
        target: "ws://localhost:8000",
        ws: true,
      },
    },
  },
});
