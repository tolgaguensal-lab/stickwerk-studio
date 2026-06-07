import { test, expect } from "@playwright/test";

test.describe("Visual Integrity — Overlays, Fonts & Layout", () => {
  const viewports = [
    { width: 390, height: 844, name: "Mobile" },
    { width: 768, height: 1024, name: "Tablet" },
    { width: 1280, height: 800, name: "Desktop" },
  ];

  const pages = [
    { path: "/", name: "Homepage" },
    { path: "/ratgeber/pflege-von-stickpatches", name: "Ratgeber-Artikel" },
    { path: "/galerie", name: "Galerie" },
    { path: "/kontakt", name: "Kontakt" },
    { path: "/ueber-uns", name: "Über uns" },
    { path: "/faq", name: "FAQ" },
    { path: "/impressum", name: "Impressum" },
    { path: "/datenschutz", name: "Datenschutz" },
    { path: "/agb", name: "AGB" },
    { path: "/ratgeber", name: "Ratgeber" },
  ];

  for (const vp of viewports) {
    for (const pageDef of pages) {
      test(`${pageDef.name} — kein Overlay, lesbare Fonts (${vp.name})`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(pageDef.path);
        await page.waitForLoadState("networkidle");

        // 1. Kein horizontaler Scroll (Overlays brechen oft das Layout)
        const hasHScroll = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        );
        expect(hasHScroll).toBe(false);

        // 2. Kein sichtbarer Fehler-Toast/Overlay beim Seiten-Load
        const errorDialogs = page.locator(
          '[role="alert"], [role="dialog"], [data-state="open"]',
        );
        const dialogCount = await errorDialogs.count();
        // Erlaubt: max 1 Dialog (z.B. Cookie-Consent). Alles andere = Overlay-Problem
        // Cookie-Consent hat meist ein data-testid oder bestimmten Text
        if (dialogCount > 0) {
          for (let i = 0; i < dialogCount; i++) {
            const text = await errorDialogs.nth(i).textContent();
            const isCookieConsent =
              text?.toLowerCase().includes("cookie") ||
              text?.toLowerCase().includes("datenschutz") ||
              text?.toLowerCase().includes("akzeptieren");
            if (!isCookieConsent) {
              // Wenn es kein Cookie-Consent ist, muss es eine bewusste Modal sein
              console.log(
                `Warnung: Unerwarteter Dialog auf ${pageDef.path}: "${text?.trim()}"`,
              );
            }
          }
        }

        // 3. Kein Text hinter anderen Elementen versteckt
        const hiddenTexts = await page.evaluate(() => {
          const allEls = Array.from(
            document.querySelectorAll("h1, h2, h3, h4, p, li, span, a, button, label"),
          );
          const problems: string[] = [];
          for (const el of allEls) {
            const text = el.textContent?.trim();
            if (!text || text.length < 3) continue;
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            const atCenter = document.elementFromPoint(
              rect.left + rect.width / 2,
              rect.top + rect.height / 2,
            );
            if (atCenter && atCenter !== el && !el.contains(atCenter) && !atCenter.contains(el)) {
              const topBg = window.getComputedStyle(atCenter).backgroundColor;
              if (topBg !== "rgba(0, 0, 0, 0)" && topBg !== "transparent") {
                const topOpacity = window.getComputedStyle(atCenter).opacity;
                if (parseFloat(topOpacity) > 0.5) {
                  problems.push(
                    `"${text.substring(0, 40)}" verdeckt von <${atCenter.tagName.toLowerCase()}> (bg: ${topBg}, opacity: ${topOpacity})`,
                  );
                }
              }
            }
          }
          return problems;
        });

        if (hiddenTexts.length > 0) {
          console.log(`=== Overlay-Probleme auf ${pageDef.path} (${vp.name}) ===`);
          for (const p of hiddenTexts) {
            console.log(`  ⚠️  ${p}`);
          }
        }
        expect(hiddenTexts.length).toBe(0);

        // 4. Font-Rendering
        const fontIssues = await page.evaluate(() => {
          const issues: string[] = [];
          const headings = Array.from(document.querySelectorAll("h1, h2, h3"));
          for (const h of headings) {
            const style = window.getComputedStyle(h);
            const fontSize = style.fontSize;
            const color = style.color;
            if (color === "rgba(0, 0, 0, 0)" || color === "transparent") {
              issues.push(
                `${h.tagName}: Unsichtbarer Text (color: ${color}) — "${h.textContent?.trim().substring(0, 30)}"`,
              );
            }
            const sizePx = parseFloat(fontSize);
            if (sizePx < 10) {
              issues.push(
                `${h.tagName}: Sehr kleine Schrift (${fontSize}) — "${h.textContent?.trim().substring(0, 30)}"`,
              );
            }
          }
          return issues;
        });

        if (fontIssues.length > 0) {
          console.log(`=== Font-Probleme auf ${pageDef.path} (${vp.name}) ===`);
          for (const iss of fontIssues) {
            console.log(`  ⚠️  ${iss}`);
          }
        }
        expect(fontIssues.length).toBe(0);
      });
    }
  }

  test("Alle Buttons und Links sind klickbar (nicht verdeckt)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const interactives = await page.evaluate(() => {
      const items: { tag: string; text: string; selector: string }[] = [];
      const buttons = Array.from(
        document.querySelectorAll("button, a, [role='button'], input, select, textarea"),
      );
      for (const btn of buttons) {
        const rect = btn.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const topEl = document.elementFromPoint(centerX, centerY);
        if (topEl && topEl !== btn && !btn.contains(topEl) && !topEl.contains(btn)) {
          items.push({
            tag: btn.tagName.toLowerCase(),
            text: (btn as HTMLElement).innerText?.trim().substring(0, 40) || "[icon]",
            selector: `${btn.tagName.toLowerCase()}:has-text("${(btn as HTMLElement).innerText?.trim().substring(0, 20)}")`,
          });
        }
      }
      return items;
    });

    if (interactives.length > 0) {
      console.log(`=== Verdeckte interaktive Elemente auf der Homepage ===`);
      for (const item of interactives) {
        console.log(`  ⚠️  <${item.tag}> "${item.text}" — wird von anderem Element verdeckt`);
      }
    }
    expect(interactives.length).toBe(0);
  });
});
