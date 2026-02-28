const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  watchForFileChanges: false,
  video: true, // Enable video recording
  videoCompression: 32, // Compression quality (0-51, lower = better quality)
  videosFolder: 'cypress/videos', // Where videos are saved
  screenshotOnRunFailure: true, // Take screenshots on failure
  screenshotsFolder: 'cypress/screenshots', // Where screenshots are saved
  e2e: {
    setupNodeEvents(on, config) {
      // Load environment variables from .env file
      config.env.USER_USERNAME = process.env.USER_USERNAME;
      config.env.USER_PASSWORD = process.env.USER_PASSWORD;
      config.env.LOGIN_URL = process.env.LOGIN_URL || 'https://entwickler.de/login';
      
      return config;
    },
  },
});
