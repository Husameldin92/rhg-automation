# RHG Video Player - Cypress E2E Test Suite

This is a comprehensive end-to-end testing suite for the RHG (entwickler.de) video player using Cypress.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running Tests

#### Interactive Mode (Cypress GUI)
```bash
npm run test:open
```

#### Headless Mode (CI/CD)
```bash
npm test
# or
npm run test:headless
```

#### Browser-Specific Tests
```bash
npm run test:chrome    # Run tests in Chrome
npm run test:firefox   # Run tests in Firefox
npm run test:edge      # Run tests in Edge
```

## 📁 Test Structure

### Test Files

1. **`cypress/e2e/rhg.cy.js`** - Main test suite
   - Complete video player functionality
   - Login error handling
   - Video player element verification
   - Responsive design testing

2. **`cypress/e2e/rhg-advanced.cy.js`** - Advanced test suite
   - Video player accessibility testing
   - Video quality switching
   - Loading and buffering tests
   - Timeline and control interactions
   - Speaker and sponsor interactions
   - Comprehensive chat functionality
   - Error handling and edge cases

### Custom Commands

Located in `cypress/support/commands.js`:

- `cy.loginToRHG()` - Automated login
- `cy.navigateToEvents()` - Navigate to events page
- `cy.selectFirstEvent()` - Select the first available event
- `cy.takeScrollScreenshot(name)` - Take screenshot with scrolling
- `cy.clickMenuButton(index)` - Click menu buttons (speaker/sponsor)
- `cy.clickChatButton()` - Open chat functionality
- `cy.closeChat()` - Close chat window
- `cy.testVideoPlayer()` - Comprehensive video player testing

## 🧪 Test Coverage

### Core Functionality
- ✅ User authentication and login
- ✅ Event navigation and selection
- ✅ Video player controls (play/pause/fullscreen)
- ✅ Speaker information display
- ✅ Sponsor information display
- ✅ Chat functionality
- ✅ Screenshot capture for visual testing

### Advanced Features
- ✅ Accessibility testing (keyboard navigation, ARIA labels)
- ✅ Video quality switching
- ✅ Loading states and buffering
- ✅ Timeline and progress bar interaction
- ✅ Volume controls
- ✅ Responsive design across devices
- ✅ Error handling and edge cases
- ✅ Network simulation testing

### Browser Compatibility
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Edge
- ✅ Mobile viewports

## 📸 Screenshots and Videos

Test runs automatically capture:
- Screenshots for each major interaction
- Videos of test execution (in headless mode)
- Responsive design screenshots for different viewports
- Error state screenshots

Screenshots are saved to: `cypress/screenshots/`
Videos are saved to: `cypress/videos/`

## ⚙️ Configuration

### Cypress Configuration (`cypress.config.js`)
- Base URL: `https://entwickler.de`
- Viewport: 1280x720
- Video recording enabled
- Custom browser launch options for video autoplay
- Extended timeouts for video loading

### Test Environment
- Automatic cookie and localStorage cleanup
- Network request interception
- Video autoplay policies configured
- Responsive viewport testing

## 🔍 Test Scenarios

### Basic User Journey
1. **Login Process**
   - Cookie acceptance
   - User authentication
   - Error handling for invalid credentials

2. **Event Selection**
   - Navigate to events page
   - Select first available event
   - Verify page load

3. **Video Player Interaction**
   - General page overview
   - Speaker information access
   - Sponsor information access
   - Chat functionality
   - Video controls testing

### Advanced Testing
1. **Accessibility**
   - Keyboard navigation
   - ARIA label verification
   - Screen reader compatibility

2. **Performance**
   - Video loading times
   - Network simulation
   - Buffering behavior

3. **Responsive Design**
   - Mobile (375x667)
   - Tablet (768x1024)
   - Desktop (1280x720)

## 🐛 Debugging

### Common Issues
1. **Video not loading**: Check network connectivity and video source
2. **Element not found**: Verify selectors in DOM inspector
3. **Login failures**: Ensure credentials are still valid

### Debug Commands
```bash
# Run single test file
npx cypress run --spec "cypress/e2e/rhg.cy.js"

# Run with debug output
DEBUG=cypress:* npm test

# Open specific test in GUI
npx cypress open --spec "cypress/e2e/rhg.cy.js"
```

## 🚧 Maintenance

### Updating Selectors
When the application UI changes, update selectors in:
- Test files (`cypress/e2e/*.cy.js`)
- Custom commands (`cypress/support/commands.js`)

### Adding New Tests
1. Create new test files in `cypress/e2e/`
2. Use existing custom commands for consistency
3. Follow the naming convention: `rhg-[feature].cy.js`

## 📊 Test Results

### CI/CD Integration
Tests can be integrated with:
- GitHub Actions
- Jenkins
- CircleCI
- GitLab CI

Example results include:
- Test execution time
- Pass/fail status
- Screenshots and videos
- Browser compatibility matrix

## 🤝 Contributing

1. Follow existing code patterns
2. Add appropriate comments
3. Update README for new features
4. Ensure tests pass in all browsers

---

**Note**: This test suite requires valid credentials for entwickler.de. Ensure you have proper authorization before running tests against the production environment.