const { defineConfig } = require("cypress");

module.exports = defineConfig({
  websecurity: false,
  video: true,
  viewportWidth: 1600,
  viewportHeight: 900,
  chromeWebSecurity: false,
  failOnStatusCode: false,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://lojaebac.ebaconline.art.br',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
