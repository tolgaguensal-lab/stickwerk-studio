import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = "admin@stickwerk-studio.de";
const ADMIN_PASSWORD = "test123";

test.describe("Admin Area", () => {
  test("should redirect unauthenticated users to /admin/login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("should allow login with valid credentials", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("input[type=email]", ADMIN_EMAIL);
    await page.fill("input[type=password]", ADMIN_PASSWORD);
    await page.click("button[type=submit]");
    await expect(page).toHaveURL("/admin", { timeout: 10000 });
    await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible({ timeout: 5000 });
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("input[type=email]", ADMIN_EMAIL);
    await page.fill("input[type=password]", "wrongpassword");
    await page.click("button[type=submit]");
    await expect(page.getByText(/fehlgeschlagen/i)).toBeVisible({ timeout: 10000 });
  });

  test("should persist session across pages after login", async ({ page }) => {
    // Login
    await page.goto("/admin/login");
    await page.fill("input[type=email]", ADMIN_EMAIL);
    await page.fill("input[type=password]", ADMIN_PASSWORD);
    await page.click("button[type=submit]");
    await expect(page).toHaveURL("/admin", { timeout: 10000 });

    // Navigate to leads — stays authenticated
    await page.goto("/admin/leads");
    await expect(page).toHaveURL(/\/admin\/leads/, { timeout: 5000 });
    await expect(page.getByRole("heading", { name: /anfragen/i })).toBeVisible({ timeout: 5000 });
  });
});
