import { test, expect } from '@playwright/test';

const adminEmail = process.env.E2E_TEST_USER_EMAIL;
const adminPassword = process.env.E2E_TEST_USER_PASSWORD;

test.describe('Authentication and Authorization', () => {

  test.beforeAll(() => {
    if (!adminEmail || !adminPassword) {
      throw new Error('E2E_TEST_USER_EMAIL and E2E_TEST_USER_PASSWORD environment variables must be set.');
    }
  });

  test('should redirect to login page when trying to access admin area without authentication', async ({ page }) => {
    await page.goto('/admin/articles');
    
    // Expect to be redirected to the login page
    await page.waitForURL('**/login', { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('Login');
  });

  test('should allow access to admin area after login and then logout successfully', async ({ page }) => {
    // 1. Login
    await page.goto('/login', { timeout: 15000 });
    if (!adminEmail || !adminPassword) {
      throw new Error('Admin credentials not available');
    }
    await page.fill('[data-testid="email-input"]', adminEmail);
    await page.fill('[data-testid="password-input"]', adminPassword);
    await page.click('[data-testid="login-button"]');

    // 2. Verify access to admin area
    await page.waitForURL('**/admin/articles', { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('Articles');

    // 3. Logout
    await page.click('[data-testid="logout-button"]');

    // 4. Verify redirection to login page after logout
    await page.waitForURL('**/login', { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('Login');

    // 5. Verify that admin area is protected again
    await page.goto('/admin/articles');
    await page.waitForURL('**/login', { timeout: 15000 });
    expect(page.url()).toContain('/login');
  });

  test('should redirect to admin page when a logged-in user tries to access login page', async ({ page }) => {
    // 1. Login first
    await page.goto('/login', { timeout: 15000 });
    if (!adminEmail || !adminPassword) {
      throw new Error('Admin credentials not available');
    }
    await page.fill('[data-testid="email-input"]', adminEmail);
    await page.fill('[data-testid="password-input"]', adminPassword);
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('**/admin/articles', { timeout: 15000 });

    // 2. Try to access login page again
    await page.goto('/login');
    
    // 3. Expect to be redirected back to the admin area
    await page.waitForURL('**/admin/articles', { timeout: 15000 });
    expect(page.url()).toContain('/admin/articles');
  });
}); 