import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://skillpact.onrender.com",
        changeOrigin: true,
        secure: false, // In case of SSL issues (optional)
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Ensure paths are clean
      },
    },
  },
});
