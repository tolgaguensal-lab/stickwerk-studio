import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/kontakt");
    await page.waitForTimeout(2000);
  });

  test("should display form fields", async ({ page }) => {
    await expect(page.getByPlaceholder("Ihr voller Name")).toBeVisible({ timeout: 10000 });
    await expect(page.getByPlaceholder("email@beispiel.de")).toBeVisible();
    await expect(page.getByPlaceholder("+49 ...")).toBeVisible();
    await expect(page.getByPlaceholder("Wie können wir Ihnen helfen?")).toBeVisible();
  });

  test("should fill name field", async ({ page }) => {
    const nameField = page.getByPlaceholder("Ihr voller Name");
    await nameField.fill("Max Mustermann");
    await expect(nameField).toHaveValue("Max Mustermann");
  });

  test("should fill email field", async ({ page }) => {
    const emailField = page.getByPlaceholder("email@beispiel.de");
    await emailField.fill("max@example.de");
    await expect(emailField).toHaveValue("max@example.de");
  });

  test("should fill message field", async ({ page }) => {
    const messageField = page.getByPlaceholder("Wie können wir Ihnen helfen?");
    await messageField.fill("Test Nachricht");
    await expect(messageField).toHaveValue("Test Nachricht");
  });

  test("should toggle privacy checkbox", async ({ page }) => {
    const checkbox = page.getByRole("checkbox");
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });
});

test.describe("Patch Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#calculator");
    await page.waitForTimeout(2000);
  });

  test("should display calculator", async ({ page }) => {
    await expect(page.locator("#calculator")).toBeVisible({ timeout: 10000 });
  });

  test("should show shape selection", async ({ page }) => {
    await expect(page.getByText(/form.*wählen/i)).toBeVisible({ timeout: 10000 });
  });

  test("should select shape", async ({ page }) => {
    const circleBtn = page.getByRole("button", { name: /rund/i });
    await expect(circleBtn).toBeVisible({ timeout: 10000 });
    await circleBtn.click();
    await page.waitForTimeout(500);
    await expect(page.getByRole("heading", { name: /größe/i })).toBeVisible({ timeout: 5000 });
  });
});
