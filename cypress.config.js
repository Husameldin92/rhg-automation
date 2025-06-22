const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://entwickler.de',
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser = {}, launchOptions) => {
        // Handle Chrome/Chromium browsers
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--disable-features=VizDisplayCompositor')
          launchOptions.args.push('--autoplay-policy=no-user-gesture-required')
        }
        
        // Handle Firefox
        if (browser.family === 'firefox') {
          launchOptions.preferences['media.autoplay.default'] = 0
        }
        
        return launchOptions
      })
    },
  },
});
