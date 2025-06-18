import { test, expect } from '@playwright/test';

// フッター表示とリンク・コピーライト検証

test.describe('Footer', () => {
  test('should show only Contact and Blog links and correct copyright', async ({ page }) => {
    await page.goto('/');

    // フッター要素取得
    const footer = page.locator('footer');

    // リンク要素 (a or a Link rendered as <a>)
    const links = footer.locator('a');
    await expect(links).toHaveCount(2);

    // 各リンクテキスト検証
    await expect(links.nth(0)).toHaveText(/Contact/i);
    await expect(links.nth(1)).toHaveText(/Blog/i);

    // コピーライトテキスト検証
    const currentYear = new Date().getFullYear();
    await expect(footer).toContainText(`© ${currentYear} fanda-dev.com`);
  });
}); 