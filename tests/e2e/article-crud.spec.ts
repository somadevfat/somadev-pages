import { test, expect } from '@playwright/test';

test.setTimeout(60000);

const adminEmail = process.env.E2E_TEST_USER_EMAIL;
const adminPassword = process.env.E2E_TEST_USER_PASSWORD;

test.describe.serial('Article CRUD Operations', () => {
  const testArticle = {
    title: 'E2E Test Article',
    slug: 'e2e-test-article',
    content: 'This is a test article created by E2E test.',
    tags: ['test', 'e2e'],
    excerpt: 'Test excerpt for E2E testing'
  };

  test.beforeAll(() => {
    if (!adminEmail || !adminPassword) {
      throw new Error('E2E_TEST_USER_EMAIL and E2E_TEST_USER_PASSWORD environment variables must be set.');
    }
  });

  test.beforeEach(async ({ page }) => {
    // Always start from login page to ensure authenticated session
    await page.goto('/login');

    // If already logged in, /login might redirect immediately
    if (page.url().includes('/login')) {
      await page.fill('[data-testid="email-input"]', adminEmail);
      await page.fill('[data-testid="password-input"]', adminPassword);
      await page.click('[data-testid="login-button"]');
    }

    // Wait until admin articles page loads
    await page.waitForURL('**/admin/articles', { timeout: 30000 });
    await page.waitForSelector('[data-testid="new-article-button"]', { timeout: 30000 });
  });

  test('should create a new article', async ({ page }) => {
    // Clean up existing article in case previous test run left residue
    await page.request.delete(`/api/proxy/contents/articles/${testArticle.slug}`).catch(() => {});

    // Click "New Article" button
    await page.click('[data-testid="new-article-button"]');
    
    // Fill article form
    await page.fill('[data-testid="title-input"]', testArticle.title);
    await page.fill('[data-testid="slug-input"]', testArticle.slug);
    await page.fill('[data-testid="content-textarea"]', testArticle.content);
    await page.fill('[data-testid="excerpt-input"]', testArticle.excerpt);
    
    // Add tags
    for (const tag of testArticle.tags) {
      await page.fill('[data-testid="tag-input"]', tag);
      await page.press('[data-testid="tag-input"]', 'Enter');
    }
    
    // Save article
    await page.click('[data-testid="save-button"]');
    
    // Verify redirect to articles list
    await page.waitForURL('**/admin/articles', { timeout: 30000 });
    
    // Verify article appears in list
    await expect(page.locator(`text=${testArticle.title}`)).toBeVisible();
  });

  test('should read and display article', async ({ page }) => {
    // Navigate to the created article
    await page.goto(`/blog/${testArticle.slug}`);
    
    // Wait for article title to load
    await page.waitForSelector('h1', { timeout: 30000 });
    // Verify article content is displayed
    await expect(page.locator('h1')).toContainText(testArticle.title);
    await expect(page.locator('text=' + testArticle.content)).toBeVisible();
    
    // Verify tags are displayed as links
    for (const tag of testArticle.tags) {
      await expect(page.locator(`a[href="/blog?tag=${tag}"]`)).toBeVisible();
    }
  });

  test('should update an existing article', async ({ page }) => {
    // Wait for edit button to be visible then click
    await page.waitForSelector(`[data-testid="edit-${testArticle.slug}"]`, { timeout: 30000 });
    await page.click(`[data-testid="edit-${testArticle.slug}"]`);
    
    const updatedTitle = testArticle.title + ' (Updated)';
    
    // Update title
    await page.fill('[data-testid="title-input"]', updatedTitle);
    
    // Save changes
    await page.click('[data-testid="save-button"]');
    
    // Verify redirect and updated title
    await page.waitForURL('**/admin/articles', { timeout: 30000 });
    await expect(page.locator(`text=${updatedTitle}`)).toBeVisible();
  });

  test('should delete an article', async ({ page }) => {
    // Wait for delete button to appear and click
    await page.waitForSelector(`[data-testid="delete-${testArticle.slug}"]`, { timeout: 30000 });
    await page.click(`[data-testid="delete-${testArticle.slug}"]`);
    
    // Verify article is removed from list
    await expect(page.locator(`text=${testArticle.title}`)).not.toBeVisible();
  });

  test('should verify API proxy functionality', async ({ page }) => {
    // Test API proxy by making a direct request
    const response = await page.request.get('/api/proxy/contents/articles');
    expect(response.status()).toBe(200);
    
    // Verify response contains expected data structure
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });
}); 