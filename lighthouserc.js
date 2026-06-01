/**
 * Lighthouse CI Config — Performance Budgets
 *
 * Aktiviert im CI via: npx lhci autorun
 * Lokal via: npx lhci collect && npx lhci assert
 */
module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      startServerReadyPattern: "ready started server",
      url: [
        "http://localhost:3000",
        "http://localhost:3000/kontakt",
        "http://localhost:3000/impressum",
      ],
      numberOfRuns: 3,
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        // Performance-Budgets (Mobile)
        "first-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 4000 }],
        "total-blocking-time": ["error", { maxNumericValue: 300 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "speed-index": ["warn", { maxNumericValue: 4000 }],

        // Accessibility — Barrierefreiheit ist Pflicht
        "aria-allowed-attr": ["error"],
        "aria-valid-attr-value": ["error"],
        "button-name": ["error"],
        "image-alt": ["error"],
        "label": ["error"],
        "link-name": ["error"],

        // Best Practices
        "is-on-https": ["error"],
        "no-document-write": ["error"],
        "no-vulnerable-libraries": ["error"],

        // SEO
        "meta-description": ["error"],
        "canonical": ["error"],
        "font-display": ["error"],

        // Toleranzen (für Third-Party-Schriften)
        "uses-rel-preconnect": ["warn"],
        "third-party-summary": ["warn"],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
