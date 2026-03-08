# iGaming Playwright + Cucumber Automation Framework

This repository contains a **UI test automation framework** built with:

-   Playwright
-   Cucumber (BDD)
-   TypeScript
-   Page Object Model (POM)

The framework is designed for **scalable UI automation in iGaming
platforms** and supports:

-   Parallel test execution
-   Scenario isolation
-   Page Object Model architecture
-   Cucumber BDD syntax
-   Modular test design

------------------------------------------------------------------------

# 1. Framework Architecture

The framework follows a layered architecture.

Feature Files → Step Definitions → Page Objects → Playwright API →
Browser

Responsibilities are separated to keep the project:

-   maintainable
-   scalable
-   readable
-   reusable
-   data driven

------------------------------------------------------------------------

# 2. Test Execution Flow

When a test runs, the following lifecycle happens:

Cucumber starts\
↓\
Before hook\
↓\
CustomWorld initialized\
↓\
Browser + Context + Page created\
↓\
Scenario steps executed\
↓\
Page Objects interact with UI\
↓\
After hook\
↓\
Browser closed

Each scenario runs in **an isolated browser context**.

------------------------------------------------------------------------

# 3. Page Object Model Flow

Step Definition → Page Object → BasePage Helpers → Playwright Page

Responsibilities:

Step Definitions\
→ describe behaviour

Page Objects\
→ contain UI logic

BasePage\
→ reusable browser actions

------------------------------------------------------------------------

# 4. World Context Flow

Scenario → CustomWorld → Browser → Context → Page

All step files share the same `CustomWorld` instance during a scenario.

This allows steps to access:

-   this.page
-   this.loginPage
-   this.brandsPage
-   this.depositPage

------------------------------------------------------------------------

# 5. Matrix Test Generation Flow

The framework supports **data-driven scenario generation**.

Matrix generation flow:

Matrix Feature → examplesGenerator → matrixEngine → Generated Features →
Cucumber Execution

This allows dynamic creation of scenarios from configuration such as:

-   currency flags
-   payment flags

------------------------------------------------------------------------

# 6. Parallel Execution

Tests run in parallel using Cucumber configuration.

Execution model:

Worker 1 → Scenario A\
Worker 2 → Scenario B\
Worker 3 → Scenario C

Each worker has:

-   separate browser context
-   separate world instance
-   separate page

This prevents collisions between tests.

------------------------------------------------------------------------

# 7. Installation Instructions

Follow these steps to run the project on a fresh machine.

## 1. Install Node.js

Download Node.js:

https://nodejs.org

Recommended version:

Node \>= 18

Verify installation:

node -v\
npm -v

------------------------------------------------------------------------

## 2. Clone the Repository

git clone https://github.com/selenss/shuffleup.git

------------------------------------------------------------------------

## 3. Install Project Dependencies

npm install

This installs:

-   Playwright
-   Cucumber
-   TypeScript
-   ts-node
-   project dependencies

------------------------------------------------------------------------

## 4. Install Playwright Browsers

Playwright requires browser binaries.

Run:

npx playwright install

This installs:

-   Chromium
-   Firefox
-   WebKit

------------------------------------------------------------------------

## 5. Run Tests

Execute all tests:

npm run test

------------------------------------------------------------------------

## 6. Run Tests with Tags

You can execute specific scenarios using tags.

Example:

npm run test -- --tags @brandA