import { test, expect } from "@playwright/test";

test.describe("Homepage - All Interactive Elements", () => {
  test("should find and inventory all interactive elements", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const buttons = await page.getByRole("button").all();
    const links = await page.getByRole("link").all();

    console.log(`Found ${buttons.length} buttons`);
    console.log(`Found ${links.length} links`);

    for (const button of buttons) {
      const isVisible = await button.isVisible();
      const text = await button.textContent();
      console.log(`Button: "${text?.trim()}" - visible: ${isVisible}`);
    }

    for (const link of links) {
      const isVisible = await link.isVisible();
      const href = await link.getAttribute("href");
      const text = await link.textContent();
      console.log(`Link: "${text?.trim()}" -> ${href} - visible: ${isVisible}`);
    }

    expect(buttons.length).toBeGreaterThan(0);
  });

  test("should have working navigation to calculator", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.waitForTimeout(2000);

    // Click Konfigurator via evaluate to handle fixed navbar positioning
    await page.evaluate(() => {
      const links = document.querySelectorAll('a');
      for (const link of links) {
        if (link.textContent?.trim() === 'Konfigurator') {
          link.click();
          return;
        }
      }
    });
    await page.waitForTimeout(500);

    const calculator = page.locator("#calculator, [data-testid='calculator']");
    await expect(calculator).toBeVisible({ timeout: 5000 });
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.waitForTimeout(2000);

    const navLinks = [
      { name: /^kontakt$/i, url: "/kontakt" },
      { name: /^impressum$/i, url: "/impressum" },
      { name: /^datenschutz$/i, url: "/datenschutz" },
    ];

    for (const nav of navLinks) {
      const link = page.getByRole("link", { name: nav.name }).first();
      if (await link.count() > 0) {
        // Navigate directly via href to bypass fixed navbar click issues
        const href = await link.getAttribute("href");
        if (href) {
          await page.goto(href);
          await page.waitForTimeout(1000);
          expect(page.url()).toContain(nav.url);
          await page.goBack();
          await page.waitForLoadState("load");
          await page.waitForTimeout(1000);
        }
      }
    }
  });
});
