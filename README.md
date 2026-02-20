## Project Structure Overview
```
testing/                                   # Main testing repo
│
├──  README.md                           # Project documentation
├──  package.json                         # Dependencies (Cypress, Jest)
│
├──  cypress/                             # Web E2E Tests
│   ├──  e2e/                             # Test files
│   │   ├──  01-authentication/           # Each module in its own folder
│   │   │   ├──  login.cy.js
│   │   │   ├──  register.cy.js
│   │   │   └──  forgot-password.cy.js
│   │   ├──  02-profile/
│   │   ├──  03-followers/
│   │   └── ... (12 modules)
│   │
│   ├──  fixtures/                         # Mock data for tests
│   │   ├──  users.json
│   │   ├──  tracks.json
│   │   └──  playlists.json
│   │
│   ├──  support/                          # Helpers and commands
│   │   ├──  commands/                     # Custom commands (login, etc.)
│   │   ├──  page-objects/                  # Page Object Model classes
│   │   ├──  selectors/                      # Centralized data-cy selectors
│   │   └──  utils/                          # Helper functions
│   │
│   └──  cypress.config.js                   # Cypress configuration
│
├──  patrol/                                 # Mobile App E2E Tests (Flutter)
│   └──  integration_test/                    # Test files
│       ├──  authentication_test.dart
│       ├──  profile_test.dart
│       └── ...
│
├──  k6/                                     # Stress Tests
│   ├──  scenarios/                           # Load test scenarios
│   │   ├──  auth-scenarios/
│   │   ├──  track-scenarios/
│   │   └──  social-scenarios/
│   │
│   └──  config/                               # Thresholds configuration
│
├──  reports/                                 # Test reports
│   ├──  coverage/
│   ├──  performance/
│   └──  screenshots/
│
└──  scripts/                                 # Automation scripts
    ├── 📄 run-cypress.sh
    ├── 📄 run-patrol.sh
    └── 📄 run-k6.sh
```
    
## Installation Guide
After `npm install`, you need to install these tools manually:
## 🖥️ Manual Installation (On Your Local Machine)

### **Patrol** (for Flutter E2E)
```bash
dart pub global activate patrol_cli
```

### **K6** (for Stress Testing)
```bash
# Windows
choco install k6

# Or download from https://k6.io/docs/get-started/installation/
```
## To start K6
k6 run script.js
