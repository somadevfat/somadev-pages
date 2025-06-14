import { test, expect, Page } from '@playwright/test';

const adminEmail = process.env.E2E_TEST_USER_EMAIL;
const adminPassword = process.env.E2E_TEST_USER_PASSWORD;

// ユニークなテストデータを生成
const testArticle = {
  title: `E2E Test Article ${Date.now()}`,
  slug: `e2e-test-article-${Date.now()}`,
  content: 'This is a test article created by the E2E test suite.',
  tags: ['test', 'e2e'],
  excerpt: 'Test excerpt for E2E testing a CRUD flow.'
};

let page: Page;

test.describe.serial('Article CRUD Operations', () => {

  test.beforeAll(async ({ browser }) => {
    // 全テストの前に一度だけログインし、クリーンアップを行う
    page = await browser.newPage();
    
    if (!adminEmail || !adminPassword) {
      throw new Error('Test credentials are not set in environment variables.');
    }

    // ログイン処理
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', adminEmail);
    await page.fill('[data-testid="password-input"]', adminPassword);
    await page.click('[data-testid="login-button"]');
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible({ timeout: 15000 });

    // 前回のテストが残した可能性のあるデータを削除
    await page.request.delete(`/api/proxy/contents/articles/${testArticle.slug}`).catch(() => {});
  });

  test.afterAll(async () => {
    // 全テスト終了後にテストデータをクリーンアップ
    await page.request.delete(`/api/proxy/contents/articles/${testArticle.slug}`).catch(() => {});
    await page.close();
  });

  test('should create a new article', async () => {
    await page.goto('/admin/articles');
    
    await page.click('[data-testid="new-article-button"]');
    await expect(page).toHaveURL(/.*\/admin\/articles\/new/);

    // フォーム入力
    await page.fill('[data-testid="title-input"]', testArticle.title);
    await page.fill('[data-testid="slug-input"]', testArticle.slug);
    await page.fill('[data-testid="content-textarea"]', testArticle.content);
    await page.fill('[data-testid="excerpt-input"]', testArticle.excerpt);
    for (const tag of testArticle.tags) {
      await page.fill('[data-testid="tag-input"]', tag);
      await page.press('[data-testid="tag-input"]', 'Enter');
    }
    
    await page.click('[data-testid="save-button"]');
    
    await expect(page).toHaveURL(/.*\/admin\/articles/);
    await expect(page.locator(`text=${testArticle.title}`)).toBeVisible();
  });

  test('should read the created article', async () => {
    await page.goto(`/blog/${testArticle.slug}`);
    
    await expect(page.locator('h1')).toContainText(testArticle.title);
    await expect(page.locator(`text=${testArticle.content}`)).toBeVisible();
    for (const tag of testArticle.tags) {
      await expect(page.locator(`a[href="/blog?tag=${tag}"]`)).toBeVisible();
    }
  });

  test('should update the article', async () => {
    await page.goto('/admin/articles');
    
    const updatedTitle = `${testArticle.title} (Updated)`;
    await page.click(`[data-testid="edit-${testArticle.slug}"]`);
    
    await expect(page).toHaveURL(new RegExp(`.*\\/admin\\/articles\\/edit\\/${testArticle.slug}`));
    
    await page.fill('[data-testid="title-input"]', updatedTitle);
    await page.click('[data-testid="save-button"]');
    
    await expect(page).toHaveURL(/.*\/admin\/articles/);
    await expect(page.locator(`text=${updatedTitle}`)).toBeVisible();
    testArticle.title = updatedTitle; // 後続のテストのためにタイトルを更新
  });

  test('should delete the article', async () => {
    await page.goto('/admin/articles');
    
    await page.click(`[data-testid="delete-${testArticle.slug}"]`);
    // ここで確認ダイアログの処理が必要な場合がある
    // page.on('dialog', dialog => dialog.accept());
    
    await expect(page.locator(`text=${testArticle.title}`)).not.toBeVisible({ timeout: 10000 });
  });

}); 