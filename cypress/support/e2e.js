// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

Cypress.on("uncaught:exception", (err) => {
  // Ignore AbortError from audio streaming
  if (err.message.includes("signal is aborted without reason")) {
    return false;
  }
});

// Stub grecaptcha and intercept external recaptcha scripts to avoid sitekey errors
// during test runs when VITE_RECAPTCHA_SITE_KEY is not set on the test server.
Cypress.on("window:before:load", (win) => {
  try {
    win.grecaptcha = {
      ready: (cb) => cb(),
      execute: () => Promise.resolve("test-token"),
      render: () => {},
    };
    win.___grecaptcha_cfg = win.___grecaptcha_cfg || {};
  } catch (e) {
    // ignore
  }
});

// Intercept external recaptcha script requests and return a no-op script.
beforeEach(() => {
  cy.intercept(
    { method: "GET", url: "https://www.gstatic.com/recaptcha/**" },
    {
      statusCode: 200,
      headers: { "content-type": "application/javascript" },
      body: "// stubbed recaptcha script for tests",
    },
  );
  cy.intercept(
    { method: "GET", url: "https://www.google.com/recaptcha/**" },
    {
      statusCode: 200,
      headers: { "content-type": "application/javascript" },
      body: "// stubbed recaptcha script for tests",
    },
  );
});
