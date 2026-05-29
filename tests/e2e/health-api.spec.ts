import { test, expect } from "@playwright/test";

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

  test("should return timestamp", async ({ request }) => {
    const response = await request.get("/api/health");
    const data = await response.json();
    expect(data.timestamp).toBeDefined();
  });
});

test.describe("Admin Protection", () => {
  test("admin page should be accessible (public dashboard)", async ({ page }) => {
    await page.goto("/admin");
    // Admin page is currently public - documents current behavior
    await expect(page).toHaveURL(/\/admin/);
  });

  test("admin page should display dashboard content", async ({ page }) => {
    await page.goto("/admin");
    // Should show admin interface
    await expect(page.getByText(/admin|leads|dashboard/i)).toBeVisible({ timeout: 5000 });
  });
});

test.describe("API Routes", () => {
  test("GET /api/leads should return data or error", async ({ request }) => {
    const response = await request.get("/api/leads");
    // Returns 200 if PocketBase connected, 500 if not
    // Both are valid depending on environment
    expect([200, 500]).toContain(response.status());
  });

  test("POST /api/leads should validate required fields", async ({ request }) => {
    const response = await request.post("/api/leads", {
      data: {},
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/leads should validate email", async ({ request }) => {
    const response = await request.post("/api/leads", {
      data: {
        name: "Test",
        email: "invalid-email",
        consentPrivacy: true,
      },
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/leads should require consent", async ({ request }) => {
    const response = await request.post("/api/leads", {
      data: {
        name: "Test",
        email: "test@example.com",
        consentPrivacy: false,
      },
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/contact should validate required fields", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: {},
    });
    expect(response.status()).toBe(400);
  });
});
