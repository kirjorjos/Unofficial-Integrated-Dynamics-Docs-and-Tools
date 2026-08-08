import { defineConfig } from "@playwright/test";

const PORT = 5199;
const BASE_PATH = "/Unofficial-Integrated-Dynamics-Docs-and-Tools/";
const BASE_URL = `http://localhost:${PORT}${BASE_PATH}`;
const LOCAL_SNAPSHOTS = process.env.LOCAL_SNAPSHOTS === "1";

export default defineConfig({
  testDir: "./ui-tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ["list"],
    ["html", { open: process.env.CI ? "never" : "on-failure" }],
  ],
  snapshotPathTemplate: LOCAL_SNAPSHOTS
    ? ".local-snapshots/{testFilePath}/{arg}{ext}"
    : "{testDir}/../src/assets/visual-snapshots/{testFilePath}/{arg}{ext}",
  use: {
    baseURL: BASE_URL,
    viewport: { width: 1440, height: 900 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
    },
  },
  webServer: {
    command: `npx vite --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
