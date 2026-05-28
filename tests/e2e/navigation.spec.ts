import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate to calculator section", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="#calculator"]');
    await expect(page.locator("#calculator")).toBeInViewport();
  });

  test("should navigate to contact page", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/kontakt"]');
    await expect(page).toHaveURL(/\/kontakt/);
  });

  test("should navigate to impressum", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/impressum"]');
    await expect(page).toHaveURL(/\/impressum/);
  });

  test("should navigate to datenschutz", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/datenschutz"]');
    await expect(page).toHaveURL(/\/datenschutz/);
  });

  test("should navigate to agb", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/agb"]');
    await expect(page).toHaveURL(/\/agb/);
  });
});
