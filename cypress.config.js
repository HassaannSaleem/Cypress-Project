const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Volopa Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    retries:{
      runMode: 0,
      openMode: 0
    },
    baseUrl : "https://uiredevelopment.volopa.com/login",
    "pageLoadTimeout" : 100000,
    "defaultCommandTimeout" : 300000,
    chromeWebSecurity: false,
    //video: true,
    //videoCompression: 15,
  },
  
});
