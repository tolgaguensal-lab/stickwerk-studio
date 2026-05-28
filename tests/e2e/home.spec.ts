import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Stickwerk-Studio/);
  });

  test("should display main heading", async ({ page }) => {
    await page.goto("/");
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");
    
    // Check calculator link
    const calculatorLink = page.locator('a[href="#calculator"]');
    await expect(calculatorLink).toBeVisible();
  });

  test("should have no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });
    
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    
    expect(errors).toEqual([]);
  });
});
