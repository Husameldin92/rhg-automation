const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  watchForFileChanges: false,
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
