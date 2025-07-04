import { defineConfig, devices } from '@playwright/test';

const isInsideCompose = !!process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  timeout: 30000,
  globalTimeout: 600000,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3001',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  ...(isInsideCompose
    ? {}
    : {
        webServer: {
          command: 'docker compose -f docker-compose.e2e.yml up --build backend frontend',
          url: 'http://localhost:3001',
          timeout: 240_000,
          reuseExistingServer: true,
        },
      }),
}); 