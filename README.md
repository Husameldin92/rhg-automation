# RHG Automation

Automated end-to-end testing for the RHG (Rheinhessen Gipfel) video player and event platform using Cypress.

## Overview

This automation suite tests the RHG video player functionality on entwickler.de. It performs comprehensive checks of the event platform including:

- **User Authentication**: Automated login with cookie consent handling
- **Event Navigation**: Accessing and selecting events from the "My Events" page
- **UI Components Testing**: 
  - FAQ modal
  - Lageplan (location plan) modal
  - Raumplan (room plan) modal
  - Speaker information panel
  - Sponsor information panel
  - Chat functionality
- **Visual Testing**: Screenshots at key interaction points
- **Video Recording**: All test runs are recorded for debugging and review

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager
- Valid entwickler.de account credentials

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Copy the example environment file and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   USER_USERNAME=your-email@example.com
   USER_PASSWORD=your-password
   ```
   
   Optionally, you can set a custom login URL:
   ```env
   LOGIN_URL=https://entwickler.de/login
   ```

## Running Tests

### Interactive Mode (with Cypress UI)

Run tests with the Cypress Test Runner (recommended for development and debugging):

```bash
npx cypress open
```

This opens the Cypress UI where you can:
- Select and run individual tests
- Watch tests execute in real-time
- Debug test failures
- View detailed test logs

### Headless Mode (CI/CD and automated runs)

Run tests in headless mode (no browser UI, faster execution):

```bash
npx cypress run
```

**Video Recording**: Videos are automatically recorded in headless mode and saved to `cypress/videos/`. Each test run creates a video file showing the complete test execution.

**Screenshots**: Screenshots are taken on test failures and saved to `cypress/screenshots/`. Additionally, the test takes screenshots at key points (FAQ, Lageplan, Raumplan, Speaker, Sponsor, Chat).

### Run Specific Test File

To run only the RHG test:

```bash
npx cypress run --spec "cypress/e2e/rhg.cy.js"
```

### Additional Options

**Run with specific browser:**
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

**Run in headed mode (shows browser):**
```bash
npx cypress run --headed
```

**Disable video recording (if needed):**
```bash
npx cypress run --config video=false
```

## Test Structure

### Custom Commands

The project includes reusable custom commands located in `cypress/support/commands.js`:

- **`cy.userLogin()`**: Handles user authentication
  - Visits login page
  - Handles cookie consent banner ("Alle akzeptieren")
  - Handles OneSignal notification alerts
  - Performs login with credentials from `.env`
  - Checks if already logged in to avoid redundant logins

- **`cy.handleCookieConsent()`**: Handles cookie consent banner
  - Waits for cookie banner to appear
  - Clicks "Alle akzeptieren" if present

- **`cy.handleOneSignalAlert()`**: Handles OneSignal push notification alerts
  - Detects OneSignal alert presence
  - Clicks cancel button if alert appears

### Test Flow

1. **Login**: Authenticates user using `cy.userLogin()`
2. **Navigate to Events**: Visits "My Events" page and selects the first event
3. **General Overview**: Scrolls through the page and takes initial screenshot
4. **Info Menu Testing**: Tests FAQ, Lageplan, and Raumplan modals
5. **Sidebar Testing**: Tests Speaker and Sponsor panels
6. **Chat Testing**: Opens and closes chat functionality

## Video Recording

Videos are automatically recorded for all test runs (both headless and interactive modes) and saved to:
- **Location**: `cypress/videos/`
- **Format**: MP4
- **Naming**: `{test-file-name}.cy.js.mp4`

Videos are useful for:
- Debugging test failures
- Reviewing test execution
- Understanding test behavior
- CI/CD pipeline reporting

**Note**: Videos are recorded by default. To disable, set `video: false` in `cypress.config.js` or use the `--config video=false` flag.

## Screenshots

Screenshots are automatically captured:
- **On test failures**: Saved to `cypress/screenshots/`
- **During test execution**: The test takes screenshots at key points:
  - General page overview
  - FAQ modal
  - Lageplan modal
  - Raumplan modal
  - Speaker panel
  - Sponsor panel
  - Chat interface

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `USER_USERNAME` | Yes | - | Email/username for entwickler.de login |
| `USER_PASSWORD` | Yes | - | Password for entwickler.de login |
| `LOGIN_URL` | No | `https://entwickler.de/login` | Custom login URL if different |

## Troubleshooting

### Tests fail with "USER_USERNAME and USER_PASSWORD must be set"

Make sure you have created a `.env` file in the project root with your credentials. See the Setup section above.

### OneSignal alert not being dismissed

The `cy.handleOneSignalAlert()` command checks for the alert, but if it appears at unexpected times, you can manually call it in your tests:
```javascript
cy.handleOneSignalAlert()
```

### Video not recording in headless mode

Check that `video: true` is set in `cypress.config.js`. Videos are saved to `cypress/videos/` after test completion.

### Cookie consent not being handled

The cookie consent handler waits up to 10 seconds for the banner. If your site loads slower, you may need to increase the timeout in `cy.handleCookieConsent()`.

## Project Structure

```
rhg-automation/
├── cypress/
│   ├── e2e/
│   │   └── rhg.cy.js          # Main test file
│   ├── support/
│   │   ├── commands.js        # Custom Cypress commands
│   │   └── e2e.js            # Support file imports
│   ├── videos/               # Test execution videos
│   └── screenshots/          # Test failure screenshots
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment variables template
├── cypress.config.js         # Cypress configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## CI/CD Integration

This automation is designed to work in CI/CD pipelines. The headless mode (`cypress run`) is perfect for automated test execution.

Example GitHub Actions workflow:
```yaml
- name: Run Cypress tests
  run: npx cypress run
- name: Upload videos
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: cypress-videos
    path: cypress/videos/
```

## License

ISC
