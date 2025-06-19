import { test, expect } from '@playwright/test';

const adminEmail = process.env.E2E_TEST_USER_EMAIL || 'admin@example.com';
const adminPassword = process.env.E2E_TEST_USER_PASSWORD || 'password';

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

    // Verify access to admin area by waiting for logout button
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible({ timeout: 15000 });
    await expect(page.url()).toContain('/admin/articles');

    // 3. Logout
    await page.click('[data-testid="logout-button"]');

    // 4. Verify redirection to login page and that the cookie is cleared
    await page.waitForURL('**/login', { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('Login');
    
    // Check that the 'token' cookie is gone
    const cookies = await page.context().cookies();
    const tokenCookie = cookies.find(c => c.name === 'token');
    expect(tokenCookie).toBeUndefined();

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
    
    // Wait for logout button to appear
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible({ timeout: 15000 });
    await expect(page.url()).toContain('/admin/articles');

    // 2. Try to access login page again
    await page.goto('/login');
    
    // 3. Expect to be redirected back to the admin area
    await page.waitForURL('**/admin/articles', { timeout: 15000 });
    expect(page.url()).toContain('/admin/articles');
  });

  test('should login successfully and store JWT cookie', async ({ page }) => {
    // Go to login page
    await page.goto('/login');
    
    // Fill login form
    await page.fill('[data-testid="email-input"]', adminEmail);
    await page.fill('[data-testid="password-input"]', adminPassword);
    
    // Submit login
    await page.click('[data-testid="login-button"]');
    
    // Should redirect to admin dashboard
    await expect(page).toHaveURL(/.*\/admin\/articles/);
    
    // Verify logout button is visible (indicating successful login)
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
    
    // Verify JWT token cookie is stored
    const cookies = await page.context().cookies();
    const tokenCookie = cookies.find(cookie => cookie.name === 'token');
    expect(tokenCookie).toBeDefined();
    expect(tokenCookie?.value).toBeTruthy();
    expect(tokenCookie?.httpOnly).toBe(true);
  });

  test('should logout successfully and clear JWT cookie', async ({ page }) => {
    // First login
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', adminEmail);
    await page.fill('[data-testid="password-input"]', adminPassword);
    await page.click('[data-testid="login-button"]');
    
    // Verify login successful
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
    
    // Logout
    await page.click('[data-testid="logout-button"]');
    
    // Should redirect to login page
    await expect(page).toHaveURL(/.*\/login/);
    
    // Verify token cookie is removed or expired
    const cookies = await page.context().cookies();
    const tokenCookie = cookies.find(cookie => cookie.name === 'token');
    // Cookie should either not exist or be expired (value empty/maxAge 0)
    if (tokenCookie) {
      expect(tokenCookie.value).toBeFalsy();
    }
  });
}); 