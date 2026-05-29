import { test, expect } from "@playwright/test";

test.describe("Admin Area", () => {
  test("should be accessible without authentication (public dashboard)", async ({ page }) => {
    await page.goto("/admin");
    
    // Admin page should be accessible (currently no auth)
    // This test documents the current behavior
    await expect(page).toHaveURL(/\/admin/);
  });

  test("should display admin dashboard", async ({ page }) => {
    await page.goto("/admin");
    
    // Should show admin interface with Lead Management heading
    await expect(page.getByRole("heading", { name: /lead management/i })).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Health Endpoint", () => {
  test("should return 200 OK", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.status()).toBe(200);
  });

  test("should return JSON with status ok", async ({ request }) => {
    const response = await request.get("/api/health");
    const data = await response.json();
    expect(data.status).toBe("ok");
  });
});
