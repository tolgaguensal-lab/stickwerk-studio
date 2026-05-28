import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/kontakt");
  });

  test("should display contact form", async ({ page }) => {
    await expect(page.locator("text=Schreiben Sie uns")).toBeVisible();
  });

  test("should show validation error when submitting empty form", async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Bitte geben Sie Ihren Namen")).toBeVisible();
  });

  test("should show email validation error", async ({ page }) => {
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "invalid-email");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=gültige E-Mail")).toBeVisible();
  });

  test("should require privacy consent", async ({ page }) => {
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('textarea[name="message"]', "Test message");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Datenschutzerklärung zu")).toBeVisible();
  });

  test("should submit form with valid data", async ({ page }) => {
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('textarea[name="message"]', "Test message");
    await page.check('#consent-privacy');
    await page.click('button[type="submit"]');
    
    // Should show success message or loading state
    await expect(page.locator("text=Senden...")).toBeVisible();
  });
});
