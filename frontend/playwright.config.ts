import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:8080",
  },
  webServer: {
    command: "npm run dev -- --host --port 8080",
    url: "http://localhost:8080",
    reuseExistingServer: true,
  },
});
