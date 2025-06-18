import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      'tests/e2e/**', // Playwright e2e tests are run with Playwright, not Vitest
      'node_modules/**'
    ],
    environment: 'node'
  }
}); 