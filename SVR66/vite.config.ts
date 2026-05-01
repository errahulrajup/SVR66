import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    // Chunk size warning threshold
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Code splitting — each page loads only what it needs
        manualChunks: {
          // Core React vendor chunk
          "vendor-react": ["react", "react-dom", "react-router"],
          // Email service — only loaded on contact page
          "vendor-email": ["@emailjs/browser"],
        },
      },
    },
  },
  // Optimize deps
  optimizeDeps: {
    include: ["react", "react-dom", "react-router"],
  },
});
