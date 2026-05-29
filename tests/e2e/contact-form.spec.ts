import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/kontakt");
    await page.waitForTimeout(2000);
  });

  test("should display contact form", async ({ page }) => {
    await expect(page.locator("text=Schreiben Sie uns")).toBeVisible();
  });

  test("should show validation error when submitting empty form", async ({ page }) => {
    await page.locator("#consent-privacy").check();
    await page.waitForFunction(() => typeof (window as any).__setConsentPrivacy === 'function', {}, { timeout: 10000 });
    await page.evaluate(() => (window as any).__setConsentPrivacy(true));
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
    await expect(page.getByText("Bitte geben Sie Ihren Namen")).toBeVisible();
  });

  test("should show email validation error", async ({ page }) => {
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "invalid-email");
    await page.locator("#consent-privacy").check();
    await page.evaluate(() => (window as any).__setConsentPrivacy(true));
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
    await expect(page.getByText("gültige E-Mail")).toBeVisible();
  });

  test("should require privacy consent", async ({ page }) => {
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('textarea[name="message"]', "Test message");

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();

    await page.evaluate(() => (window as any).__setConsentPrivacy(true));
    await page.waitForTimeout(500);
    await expect(submitButton).toBeEnabled({ timeout: 3000 });
  });

  test("should submit form with valid data", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('textarea[name="message"]', "Test message");
    await page.locator("#consent-privacy").check();
    await page.evaluate(() => (window as any).__setConsentPrivacy(true));
    await page.waitForTimeout(500);

    await page.click('button[type="submit"]');
    await expect(page.getByText("Nachricht gesendet!")).toBeVisible({ timeout: 5000 });
  });
});
