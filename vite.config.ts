import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import path from "node:path";
import { areas } from "./src/data/areas";

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        concurrency: 8,
      },
      pages: [
        { path: "/" },
        { path: "/tarieven" },
        { path: "/slotenmaker" },
        ...areas.map((a) => ({ path: `/slotenmaker/${a.slug}` })),
      ],
    }),
    netlify(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "~": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    target: "es2022",
    cssCodeSplit: true,
    sourcemap: false,
  },
});
