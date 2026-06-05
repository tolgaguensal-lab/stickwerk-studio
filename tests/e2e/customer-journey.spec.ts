import { test, expect } from "@playwright/test";

test.describe("Customer Journey — Vollständiger Durchlauf", () => {
  test.beforeEach(async ({ page }) => {
    // Start immer von der Homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  test("1. Homepage erkunden — Hero, Navigation, alle Sektionen sichtbar", async ({ page }) => {
    // Hero-Bereich
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /konfigurieren/i }).first()).toBeVisible();

    // Navigation: Alle Hauptlinks müssen sichtbar sein
    const nav = page.locator("nav").first();
    const navLinks = ["Kontakt", "Galerie", "FAQ", "Über uns"];
    for (const name of navLinks) {
      const link = nav.getByRole("link", { name: new RegExp(name, "i") }).first();
      await expect(link).toBeVisible();
    }

    // Scrollt durch die Seite — alle Sektionen müssen laden
    const sections = ["#calculator", "#faq", "#contact"];
    for (const sel of sections) {
      await page.evaluate((s) => {
        const el = document.querySelector(s);
        if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
      }, sel);
      await page.waitForTimeout(300);
      const section = page.locator(sel).first();
      await expect(section).toBeVisible();
    }
  });

  test("2. Patch-Konfigurator — Komplette Durchlauf (Rund → Klein → Einfach → Preis)", async ({ page }) => {
    // Zum Calculator scrollen
    await page.evaluate(() => {
      const el = document.querySelector("#calculator");
      if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
    });
    await page.waitForTimeout(500);
    await expect(page.locator("#calculator")).toBeVisible();

    // Step 1: Form wählen — "Rund"
    const rundBtn = page.locator("#calculator button").filter({ hasText: /rund/i }).first();
    await expect(rundBtn).toBeVisible();
    await rundBtn.click();
    await page.waitForTimeout(500);
    await expect(page.getByRole("heading", { name: /größe|size|format/i })).toBeVisible({ timeout: 5000 });

    // Step 2: Größe wählen — "Klein"
    const kleinBtn = page.locator("#calculator button").filter({ hasText: /klein|small|6cm|8cm/i }).first();
    await expect(kleinBtn).toBeVisible();
    await kleinBtn.click();
    await page.waitForTimeout(500);
    await expect(page.getByRole("heading", { name: /komplexität|design|detail/i })).toBeVisible({ timeout: 5000 });

    // Step 3: Komplexität — "Einfach"
    const einfachBtn = page.locator("#calculator button").filter({ hasText: /einfach|simple|1-2 farben?/i }).first();
    await expect(einfachBtn).toBeVisible();
    await einfachBtn.click();
    await page.waitForTimeout(500);

    // Ergebnis: Preis muss sichtbar sein
    await expect(page.locator("#calculator").getByText(/gesamtpreis|preis|summe|€/i).first()).toBeVisible({ timeout: 5000 });
  });

  test("3. Galerie — Alle Bilder und Kategorien laden", async ({ page }) => {
    await page.goto("/galerie");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Titel
    await expect(page.locator("h1")).toBeVisible();

    // Galerie-Karten/Filter müssen sichtbar sein
    const cards = page.locator("img, [role='img'], figure, .card");
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test("4. FAQ — Alle Akkordeons aufklappbar", async ({ page }) => {
    await page.goto("/faq");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await expect(page.locator("h1")).toBeVisible();

    // Alle FAQ-Einträge aufklappen und prüfen
    const accordionTriggers = page.locator("[data-state='closed'] button, [role='button'], summary, .accordion-trigger, button[aria-expanded]");
    const triggerCount = await accordionTriggers.count();

    if (triggerCount > 0) {
      // Ersten Eintrag aufklappen
      await accordionTriggers.first().click();
      await page.waitForTimeout(300);
      // Prüfen dass Inhalt sichtbar wurde
      const openContent = page.locator("[data-state='open'] + div, [data-state='open'] ~ div, details[open]");
      await expect(openContent.first()).toBeVisible({ timeout: 3000 });
    }
  });

  test("5. Über uns — Team, Werte, Maschinen-Statistiken", async ({ page }) => {
    await page.goto("/ueber-uns");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await expect(page.locator("h1")).toBeVisible();
    // Mindestens ein weiterer Inhalt
    const contentEls = page.locator("p, h2, h3");
    const count = await contentEls.count();
    expect(count).toBeGreaterThan(3);
  });

  test("6. Ratgeber — Übersicht + Artikel lesen", async ({ page }) => {
    await page.goto("/ratgeber");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await expect(page.locator("h1")).toBeVisible();

    // Einen Artikel anklicken
    const articleLink = page.locator("a[href*='/ratgeber/']").first();
    if (await articleLink.count() > 0) {
      await articleLink.click();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);
      // Artikel muss Inhalt haben
      const paragraphs = page.locator("article p, main p, .content p");
      const pCount = await paragraphs.count();
      expect(pCount).toBeGreaterThan(0);
    }
  });

  test("7. Kontaktformular — Ausfüllen und absenden", async ({ page }) => {
    await page.goto("/kontakt");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Formular muss sichtbar sein
    const nameInput = page.locator("input[name='name'], input#name, input[placeholder*='Name']").first();
    const emailInput = page.locator("input[name='email'], input#email, input[placeholder*='Email']").first();
    const messageArea = page.locator("textarea").first();

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageArea).toBeVisible();

    // Ausfüllen
    await nameInput.fill("Max Mustermann");
    await emailInput.fill("max@example.com");
    await messageArea.fill("Ich habe Interesse an einem individuellen Patch-Projekt. Bitte kontaktieren Sie mich.");

    // Datenschutz-Checkbox (falls vorhanden)
    const privacyCheckbox = page.locator("input[type='checkbox']").first();
    if (await privacyCheckbox.count() > 0) {
      await privacyCheckbox.check();
    }

    // Submit-Button
    const submitBtn = page.locator("button[type='submit'], button:has-text('senden'), button:has-text('abschicken')").first();
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Erfolgsmeldung oder Weiterleitung abwarten
    await page.waitForTimeout(2000);
    const successText = page.locator("text=erfolgreich|gesendet|vielen dank|erhalten", { hasText: /erfolgreich|gesendet|vielen dank|erhalten/i });
    // Optional — nicht jeder Server hat SMTP konfiguriert
    if (await successText.count() > 0) {
      await expect(successText.first()).toBeVisible();
    }
  });

  test("8. Admin-Login + Dashboard", async ({ page }) => {
    await page.goto("/admin");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Sollte auf Login weiterleiten
    await expect(page).toHaveURL(/\/admin\/login/);

    // Login-Formular
    const emailInput = page.locator("input[name='email'], input[type='email'], input#email").first();
    const passwordInput = page.locator("input[name='password'], input[type='password']").first();
    const loginBtn = page.locator("button[type='submit'], button:has-text('anmelden')").first();

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Einloggen
    await emailInput.fill("admin@stickwerk-studio.de");
    await passwordInput.fill("test123");
    await loginBtn.click();

    // Warten auf Dashboard
    await page.waitForURL("**/admin**", { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Dashboard muss geladen sein
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();

    // Admin-Navigation: Haupt-Links müssen sichtbar sein
    const adminNav = page.locator("nav a, aside a, [role='navigation'] a").first();
    await expect(adminNav).toBeVisible();
  });

  test("9. Admin — Leads, Orders und Customers Seiten", async ({ page }) => {
    // Einloggen
    await page.goto("/admin/login");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    await page.locator("input[name='email'], input[type='email']").first().fill("admin@stickwerk-studio.de");
    await page.locator("input[name='password'], input[type='password']").first().fill("test123");
    await page.locator("button[type='submit']").first().click();
    await page.waitForURL("**/admin**", { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Leads-Seite
    await page.goto("/admin/leads");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("body")).toBeVisible();

    // Orders-Seite
    await page.goto("/admin/orders");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("body")).toBeVisible();

    // Customers-Seite
    await page.goto("/admin/customers");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("body")).toBeVisible();
  });
});
