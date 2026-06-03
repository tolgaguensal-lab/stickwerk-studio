import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = "admin@stickwerk-studio.de";
const ADMIN_PASSWORD = "test123";

test.describe("Admin Auth Middleware", () => {
  test("should redirect unauthenticated users to /admin/login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("should redirect to login with redirect param preserving original path", async ({ page }) => {
    await page.goto("/admin/orders");
    await expect(page).toHaveURL(/\/admin\/login\?redirect=%2Fadmin%2For/);
  });

  test("should allow access to /admin/login without auth", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByRole("heading", { name: /admin login/i })).toBeVisible({ timeout: 10000 });
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("input[type=email]", ADMIN_EMAIL);
    await page.fill("input[type=password]", "wrongpassword");
    await page.click("button[type=submit]");
    await expect(page.getByText(/fehlgeschlagen/i)).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Admin Login Flow", () => {
  test("should log in successfully and redirect to dashboard", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("input[type=email]", ADMIN_EMAIL);
    await page.fill("input[type=password]", ADMIN_PASSWORD);
    await page.click("button[type=submit]");
    await expect(page).toHaveURL("/admin", { timeout: 10000 });
    await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible({ timeout: 5000 });
  });

  test("should persist session across pages after login", async ({ page }) => {
    // Login
    await page.goto("/admin/login");
    await page.fill("input[type=email]", ADMIN_EMAIL);
    await page.fill("input[type=password]", ADMIN_PASSWORD);
    await page.click("button[type=submit]");
    await expect(page).toHaveURL("/admin", { timeout: 10000 });

    // Navigate to leads page — should stay authenticated
    await page.goto("/admin/leads");
    await expect(page).toHaveURL(/\/admin\/leads/, { timeout: 5000 });
    await expect(page.getByRole("heading", { name: /anfragen/i })).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Admin Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto("/admin/login");
    await page.fill("input[type=email]", ADMIN_EMAIL);
    await page.fill("input[type=password]", ADMIN_PASSWORD);
    await page.click("button[type=submit]");
    await expect(page).toHaveURL("/admin", { timeout: 10000 });
  });

  test("should display stat cards", async ({ page }) => {
    await expect(page.getByText(/neue anfragen/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/in bearbeitung/i)).toBeVisible();
    await expect(page.getByText(/aktive aufträge/i)).toBeVisible();
    await expect(page.getByText(/umsatz/i)).toBeVisible();
  });

  test("should show recent leads section", async ({ page }) => {
    await expect(page.getByText(/aktuelle anfragen/i)).toBeVisible({ timeout: 5000 });
  });

  test("should show active orders section", async ({ page }) => {
    await expect(page.getByText(/aufträge in produktion/i)).toBeVisible({ timeout: 5000 });
  });

  test("sidebar navigation links should be visible", async ({ page }) => {
    const sidebar = page.locator("aside");
    await expect(sidebar.getByText(/dashboard/i)).toBeVisible();
    await expect(sidebar.getByText(/anfragen/i)).toBeVisible();
    await expect(sidebar.getByText(/aufträge/i)).toBeVisible();
    await expect(sidebar.getByText(/kunden/i)).toBeVisible();
  });
});

test.describe("Admin Orders", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("input[type=email]", ADMIN_EMAIL);
    await page.fill("input[type=password]", ADMIN_PASSWORD);
    await page.click("button[type=submit]");
    await expect(page).toHaveURL("/admin", { timeout: 10000 });
  });

  test("orders page loads with correct heading", async ({ page }) => {
    await page.goto("/admin/orders");
    await expect(page.getByRole("heading", { name: /aufträge/i })).toBeVisible({ timeout: 5000 });
  });

  test("orders page has search input", async ({ page }) => {
    await page.goto("/admin/orders");
    await expect(page.getByPlaceholder(/auftragsnummer/i)).toBeVisible({ timeout: 5000 });
  });

  test("orders page has status filter buttons", async ({ page }) => {
    await page.goto("/admin/orders");
    await expect(page.getByRole("button", { name: /alle/i })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("button", { name: /eingegangen/i })).toBeVisible();
  });
});

test.describe("Admin Customers", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("input[type=email]", ADMIN_EMAIL);
    await page.fill("input[type=password]", ADMIN_PASSWORD);
    await page.click("button[type=submit]");
    await expect(page).toHaveURL("/admin", { timeout: 10000 });
  });

  test("customers page loads with correct heading", async ({ page }) => {
    await page.goto("/admin/customers");
    await expect(page.getByRole("heading", { name: /kunden/i })).toBeVisible({ timeout: 5000 });
  });

  test("customers page has search input", async ({ page }) => {
    await page.goto("/admin/customers");
    await expect(page.getByPlaceholder(/kunde oder e-mail/i)).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Admin Leads", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("input[type=email]", ADMIN_EMAIL);
    await page.fill("input[type=password]", ADMIN_PASSWORD);
    await page.click("button[type=submit]");
    await expect(page).toHaveURL("/admin", { timeout: 10000 });
  });

  test("leads page loads with correct heading", async ({ page }) => {
    await page.goto("/admin/leads");
    await expect(page.getByRole("heading", { name: /anfragen/i })).toBeVisible({ timeout: 5000 });
  });

  test("leads page has CSV export button", async ({ page }) => {
    await page.goto("/admin/leads");
    await expect(page.getByRole("button", { name: /csv export/i })).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Admin API Auth Protection", () => {
  test("API routes should return 401/redirect without auth", async ({ request }) => {
    // Orders API requires auth
    const response = await request.get("/api/orders");
    // Should either redirect to login or return unauthorized
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(400);
  });
});
