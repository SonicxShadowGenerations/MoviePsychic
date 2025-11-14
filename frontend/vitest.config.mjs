import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    // Use a browser-like DOM environment for React Testing Library
    environment: "happy-dom",

    // Load jest-dom matchers
    setupFiles: "./src/testSetup.js",

    globals: true,

    // 👇 IMPORTANT: run everything in a single process in StackBlitz
    threads: false,
    pool: "threads", // no forks, just simple threads disabled

    include: ["src/__tests__/**/*.test.{js,jsx,ts,tsx}"],

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
