const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    video: true,
    experimentalStudio: true,
    setupNodeEvents(on, config) {
    }
  },
});