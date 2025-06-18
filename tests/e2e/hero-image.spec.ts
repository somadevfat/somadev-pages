import { test, expect } from '@playwright/test';

test.describe('Hero Section Image', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the new hero image', async ({ page }) => {
    const heroImage = page.getByAltText('Soma walking on a sunny path');
    
    // 画像が表示されていることを確認
    await expect(heroImage).toBeVisible();
    
    // src属性が正しいか確認
    await expect(heroImage).toHaveAttribute('src', /topgyazo\.jpg/);
    
    // 画像が適切に読み込まれていることを確認 (naturalWidth > 0)
    const imageLoaded = await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth > 0);
    expect(imageLoaded).toBe(true);
  });

  test('should have correct aspect ratio styles', async ({ page }) => {
    const imageContainer = page.locator('div > img[alt="Soma walking on a sunny path"]').first().locator('..');
    
    await expect(imageContainer).toHaveClass(/aspect-\[3\/4\]/);
  });
}); 