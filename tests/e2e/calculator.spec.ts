import { test, expect } from "@playwright/test";

test.describe("Patch Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#calculator");
  });

  test("should display calculator section", async ({ page }) => {
    await expect(page.locator("#calculator")).toBeVisible();
  });

  test("should show shape selection step", async ({ page }) => {
    await expect(page.locator("text=Form wählen")).toBeVisible();
  });

  test("should navigate through steps", async ({ page }) => {
    // Step 1: Select shape
    await page.click("text=Rund");
    
    // Step 2: Should show size selection
    await expect(page.locator("text=Größe festlegen")).toBeVisible();
  });

  test("should calculate price range", async ({ page }) => {
    // Complete calculator flow
    await page.click("text=Rund");
    await page.click("text=Klein");
    await page.click("text=Einfach");
    
    // Price range should be visible
    await expect(page.locator("text=Gesamtpreis")).toBeVisible();
  });
});
