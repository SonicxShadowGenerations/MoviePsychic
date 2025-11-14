import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",          // nicer for StackBlitz than jsdom
    setupFiles: "./src/testSetup.js",
    globals: true,

    // Try to avoid fork pool by preferring threads;
    // if this version ignores `pool`, it's harmless.
    pool: "threads",

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
