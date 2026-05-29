import { test, expect } from "@playwright/test";

test.describe("Patch Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#calculator");
    await page.waitForTimeout(2000);
  });

  test("should display calculator section", async ({ page }) => {
    await expect(page.locator("#calculator")).toBeVisible();
  });

  test("should show shape selection step", async ({ page }) => {
    await expect(page.getByText(/form.*wählen/i)).toBeVisible();
  });

  test("should navigate through steps", async ({ page }) => {
    // Click Rund button via evaluate to bypass animation/navbar issues
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('#calculator button');
      for (const btn of buttons) {
        if (btn.textContent?.includes('Rund')) {
          (btn as HTMLElement).click();
          return;
        }
      }
    });
    await page.waitForTimeout(1000);

    // Step 2: Should show size selection
    await expect(page.getByRole("heading", { name: /größe/i })).toBeVisible({ timeout: 5000 });
  });

  test("should calculate price range", async ({ page }) => {
    // Select shape
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('#calculator button');
      for (const btn of buttons) {
        if (btn.textContent?.includes('Rund')) {
          (btn as HTMLElement).click();
          return;
        }
      }
    });
    await page.waitForTimeout(500);

    // Select size
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('#calculator button');
      for (const btn of buttons) {
        if (btn.textContent?.includes('Klein')) {
          (btn as HTMLElement).click();
          return;
        }
      }
    });
    await page.waitForTimeout(500);

    // Select complexity
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('#calculator button');
      for (const btn of buttons) {
        if (btn.textContent?.includes('Einfach')) {
          (btn as HTMLElement).click();
          return;
        }
      }
    });
    await page.waitForTimeout(500);

    // Price range should be visible in the sidebar
    await expect(page.getByText(/gesamtpreis/i)).toBeVisible();
  });
});
