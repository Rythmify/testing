# 🧪 Rythmify Testing

A multi-tier testing framework combining **Web E2E Testing**, **Mobile & Desktop E2E Testing**, and **Stress Testing**.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [Running Tests](#running-tests)
- [Branching Strategy](#branching-strategy)

## 📊 Project Overview

This testing repository provides comprehensive test coverage across multiple platforms:

- **Web E2E Tests** (Cypress) - Test web application functionality
- **Mobile & Desktop E2E Tests** (Appium) - Cross-platform application testing
- **Performance Tests** (K6) - Stress testing

## 📁 Project Structure

```
testing/                                   # Main testing repo
│
├──  README.md                           # Project documentation
├──  package.json                         # Dependencies (Cypress, Jest)
├──  cypress.config.js                   # Cypress configuration
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
│   └──  support/                          # Helpers and commands
│       ├──  commands/                     # Custom commands (login, etc.)
│       ├──  page-objects/                 # Page Object Model classes
│       ├──  selectors/                    # Centralized data-cy selectors
│       └──  utils/                        # Helper functions
│
├──  appium/                              # Mobile & Desktop App E2E Tests
│   └──  test/                            # Test files
│       ├──  authentication.test.js
│       ├──  profile.test.js
│       └── ...
│
├──  k6/                                  # Performance & Stress Tests
│   ├──  scenarios/                       # Test scenarios
│   │   ├──  auth-scenarios/
│   │   ├──  track-scenarios/
│   │   └──  social-scenarios/
│   │
│   └──  config/                          # Thresholds configuration
│
└──  reports/                             # Test reports & artifacts
    ├──  coverage/                        # Code coverage reports
    ├──  performance/                     # Performance test results
    └──  screenshots/                     # Test screenshots/videos


```

## 🚀 Installation Guide

### Prerequisites

- **Node.js** v16+ and **npm** v8+
- **Git** for version control

### Step 1: Install NPM Dependencies

```bash
npm install
```

This installs: Cypress, Jest, and other Node-based packages.

### Step 2: Manual Tool Installation

#### **Appium** - Mobile & Desktop App E2E Testing

```bash
npm install -g appium
```

#### **K6** - Performance & Stress Testing

**Windows (using Chocolatey):**

```bash
choco install k6
```

**Or download from:** https://k6.io/docs/get-started/installation/

## ▶️ Running Tests

### Web E2E Tests (Cypress)

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run all tests headless
npm run cypress:run

# Run specific test file
npx cypress run --spec "cypress/e2e/01-authentication/login.cy.js"
```

### Mobile & Desktop Tests (Appium)

```bash
# Run Appium tests
npx appium
npm test -- appium/test/
```

### Stress Tests (K6)

```bash
k6 run k6/scenarios/auth-scenarios.js

# With custom thresholds
k6 run k6/scenarios/auth-scenarios.js --config k6/config/thresholds.json
```

## 🌿 Branching Strategy

This project follows a structured branching model:

```
main                    # Production-ready code
│
└── development                 # Development (parent for all testing branches)
    │
    ├── e2e-web             # Web E2E testing branch
    │   ├── M1_authentication_web
    │   ├── M2_profile_web
    │   ├── M3_followers_web
    │   └── ... (M12_*_web)
    │
    ├── e2e-cross           # Mobile & Desktop E2E branch
    │   ├── M1_authentication_cross
    │   ├── M2_profile_cross
    │   ├── M3_followers_cross
    │   └── ... (M12_*_cross)
    │
    └── stress              # Performance & stress testing branch
        ├── M1_authentication_stress
        ├── M2_profile_stress
        ├── M3_followers_stress
        └── ... (M12_*_stress)
```

### Branch Purposes

| Branch                      | Purpose                                          | Status         |
| --------------------------- | ------------------------------------------------ | -------------- |
| `main`                      | Stable, production-ready code                    | Protected      |
| `development`               | Development parent branch (all testing branches) | Parent branch  |
| `e2e-web`                   | Web end-to-end tests (Cypress)                   | Parent branch  |
| `M{N}_{module_name}_web`    | Web E2E tests for specific module                | Feature branch |
| `e2e-cross`                 | Mobile & Desktop tests (Appium)                  | Parent branch  |
| `M{N}_{module_name}_cross`  | Cross-platform tests for specific module         | Feature branch |
| `stress`                    | Performance & load tests (K6)                    | Parent branch  |
| `M{N}_{module_name}_stress` | Stress tests for specific module                 | Feature branch |

### Module Naming Convention

Each module branch follows this format **(NO modules directly under `development`)**:

- **For web E2E:** `M{N}_{module_name}_web` (e.g., `M1_authentication_web`, `M2_profile_web`)
- **For cross-platform E2E:** `M{N}_{module_name}_cross` (e.g., `M1_authentication_cross`, `M2_profile_cross`)
- **For stress testing:** `M{N}_{module_name}_stress` (e.g., `M1_authentication_stress`, `M2_profile_stress`)

Where `{N}` is the module number (1-12) and `{module_name}` is the module name.

### Branching Workflow

1. Ensure you're on the `development` branch as the base
2. Create a feature branch from the appropriate testing branch:
   - For web testing: `git checkout -b M1_authentication_web e2e-web`
   - For mobile/desktop testing: `git checkout -b M1_authentication_cross e2e-cross`
   - For stress testing: `git checkout -b M1_authentication_stress stress`
3. Make changes and test thoroughly
4. Create Pull Request with descriptive title including module number and type
5. After review and tests pass, merge to parent testing branch (e2e-web, e2e-cross, or stress)
6. When a testing branch is complete, merge to `development`
7. When the module complete in `development`, merge to `main` for release

### Example PR Titles

- `[M1] Add authentication tests for web platform`
- `[M1] Implement authentication cross-platform tests`
- `[M1] Add stress tests for authentication endpoints`
