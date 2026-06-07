import { test, expect } from '@playwright/test';

test.describe('Visual Design System Compliance', () => {
  const viewports = [
    { width: 390, height: 844, name: 'Mobile' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1280, height: 800, name: 'Laptop' },
    { width: 1440, height: 900, name: 'Desktop' },
  ];

  for (const vp of viewports) {
    test(`Check visual standards on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      // 1. Body background check (Creme #F7F1E6)
      const bodyBg = await page.evaluate(() => 
        window.getComputedStyle(document.body).backgroundColor
      );
      // RGB for #F7F1E6 is rgb(247, 241, 230)
      expect(bodyBg).toBe('rgb(247, 241, 230)');

      // 2. Header Height check (72px)
      const nav = page.locator('nav');
      const navBox = await nav.boundingBox();
      expect(navBox?.height).toBeCloseTo(72, 1);

      // 3. Primary Button Height check (48px)
      const primaryBtn = page.locator('button').filter({ hasText: 'Jetzt konfigurieren' }).first();
      const btnBox = await primaryBtn.boundingBox();
      expect(btnBox?.height).toBeCloseTo(48, 1);

      // 4. Input Height check (48px)
      await page.goto('/kontakt');
      const input = page.locator('input').first();
      const inputBox = await input.boundingBox();
      expect(inputBox?.height).toBeCloseTo(48, 1);

      // 5. H1 Font Size check (Desktop 64px / Mobile 40px)
      const h1 = page.locator('h1').first();
      const h1FontSize = await h1.evaluate((el) =>
        parseInt(window.getComputedStyle(el).fontSize),
      );
      if (vp.width >= 1280) {
        expect(h1FontSize).toBeGreaterThanOrEqual(64);
      } else if (vp.width <= 390) {
        expect(h1FontSize).toBeGreaterThanOrEqual(40);
      }
    });
  }

  test('Check for forbidden design elements', async ({ page }) => {
    await page.goto('/');
    
    // No horizontal scrollbars
    const hasHorizontalScroll = await page.evaluate(() => 
      document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasHorizontalScroll).toBe(false);

    // No text-xs on main content (approximation via computed style)
    const tinyTexts = await page.locator('body *:not(footer):not(nav)').evaluateAll(els => 
      els.filter(el => parseInt(window.getComputedStyle(el).fontSize) < 14).map(el => el.textContent)
    );
    // We allow a few meta-texts, but not large amounts of tiny text
    expect(tinyTexts.length).toBeLessThan(10);
  });
});
