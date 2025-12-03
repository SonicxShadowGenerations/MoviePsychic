import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    setupFiles: "./src/testSetup.js",
    globals: true,

    // 👉 run tests in a single thread, no worker pool
    threads: false,

    // don't force any pool type – let Vitest stay in-process
    // pool: undefined,

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
