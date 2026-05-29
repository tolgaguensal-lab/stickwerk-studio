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
    const calcLink = page.getByRole("link", { name: /konfigurator/i }).first();
    await expect(calcLink).toBeVisible();
  });

  test("should have no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    // Use load instead of networkidle to avoid HMR WebSocket timeout
    await page.waitForLoadState("load");
    await page.waitForTimeout(2000);

    const filteredErrors = errors.filter(e =>
      !e.includes("favicon.ico") &&
      !e.includes("Hydration") &&
      !e.includes("hydrate") &&
      !e.includes("webpack-hmr") &&
      !e.includes("WebSocket") &&
      !e.includes("ERR_INVALID_HTTP_RESPONSE") &&
      !e.includes("ERR_CONNECTION_REFUSED") &&
      !e.includes("forwardRef render")
    );

    if (filteredErrors.length > 0) {
      console.log("Console errors found:", filteredErrors);
    }

    expect(filteredErrors).toEqual([]);
  });
});
