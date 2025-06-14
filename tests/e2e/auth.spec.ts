import { test, expect } from '@playwright/test';

test.describe('Authentication and Authorization', () => {

  test('should redirect to login page when trying to access admin area without authentication', async ({ page }) => {
    await page.goto('/admin/articles');
    
    // Expect to be redirected to the login page
    await page.waitForURL('**/login');
    await expect(page.locator('h1')).toContainText('Login');
  });

  test('should allow access to admin area after login and then logout successfully', async ({ page }) => {
    // 1. Login
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'admin@example.com');
    await page.fill('[data-testid="password-input"]', 'password');
    await page.click('[data-testid="login-button"]');

    // 2. Verify access to admin area
    await page.waitForURL('**/admin/articles');
    await expect(page.locator('h1')).toContainText('Articles');

    // 3. Logout
    await page.click('[data-testid="logout-button"]');

    // 4. Verify redirection to login page after logout
    await page.waitForURL('**/login');
    await expect(page.locator('h1')).toContainText('Login');

    // 5. Verify that admin area is protected again
    await page.goto('/admin/articles');
    await page.waitForURL('**/login');
    expect(page.url()).toContain('/login');
  });

  test('should redirect to admin page when a logged-in user tries to access login page', async ({ page }) => {
    // 1. Login first
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'admin@example.com');
    await page.fill('[data-testid="password-input"]', 'password');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('**/admin/articles');

    // 2. Try to access login page again
    await page.goto('/login');
    
    // 3. Expect to be redirected back to the admin area
    await page.waitForURL('**/admin/articles');
    expect(page.url()).toContain('/admin/articles');
  });
}); 