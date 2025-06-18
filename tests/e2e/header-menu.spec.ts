import { test, expect, devices } from '@playwright/test';

test.describe('Header Responsive Menu', () => {

  // Test on a mobile viewport
  test('Mobile View: should display hamburger menu and it should be functional', async ({ page }) => {
    await page.setViewportSize(devices['iPhone 13'].viewport);
    await page.goto('/');

    // Hamburger menu button should be visible
    const hamburgerButton = page.getByLabel('Open menu');
    await expect(hamburgerButton).toBeVisible();

    // Desktop nav should be hidden
    const desktopNav = page.locator('header nav').first();
    await expect(desktopNav).toBeHidden();
    
    // Click the hamburger button to open the menu
    await hamburgerButton.click();

    // The mobile menu (drawer) should be visible
    const mobileMenu = page.getByRole('dialog');
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu.getByLabel('Close menu')).toBeVisible();

    // Links inside the mobile menu should be visible
    await expect(mobileMenu.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Projects' })).toBeVisible();

    // Click a link in the mobile menu
    await mobileMenu.getByRole('link', { name: 'Blog' }).click();

    // The URL should change to the blog page
    await expect(page).toHaveURL(/.*\/blog/);

    // Wait for navigation/network idle then confirm menu removed
    await page.waitForLoadState('networkidle');
    await expect(mobileMenu).toHaveClass(/translate-x-full/);
  });

  // Test on a desktop viewport
  test('Desktop View: should display desktop navigation and hide hamburger menu', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Hamburger menu button should be hidden
    await expect(page.getByLabel('Open menu')).toBeHidden();

    // Desktop navigation links should be visible
    const desktopNav = page.locator('header nav').first();
    await expect(desktopNav).toBeVisible();
    await expect(desktopNav.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(desktopNav.getByRole('link', { name: 'Projects' })).toBeVisible();
    
    // Mobile menu (drawer) should be hidden
    await expect(page.getByRole('dialog')).toBeHidden();
  });
}); 