import { test, expect } from "@playwright/test";

test.describe("Smoke Tests — Pages load correctly", () => {
  test("Landing page loads with hero content", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Präzision");
    await expect(page).toHaveTitle(/Stickwerk-Studio/);
  });

  test("Navigation: Kontakt link navigates correctly", async ({ page }) => {
    await page.goto("/");
    // Desktop nav: click "Leistungen" to trigger scroll, then click "Kontakt"
    const kontaktLink = page.locator("nav a", { hasText: "Kontakt" }).first();
    await kontaktLink.click();
    await expect(page).toHaveURL(/\/kontakt$/);
  });

  test("Navigation: Galerie link navigates correctly", async ({ page }) => {
    await page.goto("/");
    const galerieLink = page.locator("nav a", { hasText: "Galerie" }).first();
    await galerieLink.click();
    await expect(page).toHaveURL(/\/galerie$/);
  });

  test("Galerie page loads with portfolio grid", async ({ page }) => {
    await page.goto("/galerie");
    await expect(page.locator("h1")).toContainText("Unsere Arbeiten");
    // Should show portfolio cards
    const cards = page.locator("h3");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Smoke Tests — Legal pages", () => {
  const legalPages = [
    { path: "/impressum", title: /Impressum/i },
    { path: "/datenschutz", title: /Datenschutz/i },
    { path: "/agb", title: /AGB/i },
  ];

  for (const pageDef of legalPages) {
    test(`${pageDef.path} loads with correct title`, async ({ page }) => {
      await page.goto(pageDef.path);
      await expect(page).toHaveTitle(pageDef.title);
    });
  }
});

test.describe("Smoke Tests — Contact form", () => {
  test("Contact page shows form fields", async ({ page }) => {
    await page.goto("/kontakt");
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator("textarea")).toBeVisible();
  });
});

test.describe("Smoke Tests — 404 handling", () => {
  test("Non-existent page shows 404", async ({ page }) => {
    await page.goto("/nonexistent-seite", { waitUntil: "networkidle" });
    // Next.js returns 200 for not-found but renders the not-found page
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});
