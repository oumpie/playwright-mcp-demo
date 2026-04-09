# Project Architecture

## Overview

This project is an AI-driven end-to-end test automation suite for the [OrangeHRM Open Source](https://opensource-demo.orangehrmlive.com) HR management system. It combines **Playwright** for browser automation with **GitHub Copilot agents** to plan, generate, and heal tests autonomously.

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Test framework | [Playwright](https://playwright.dev) (TypeScript) | Browser automation and assertions |
| Language | TypeScript | Type-safe test authoring |
| Runtime | Node.js v18+ | Execution environment |
| AI agents | GitHub Copilot (Claude Sonnet 4) | Test planning, generation, healing |
| MCP server | `npx playwright run-test-mcp-server` | Agent ↔ browser communication |
| CI/CD | GitHub Actions | Automated test execution on push/PR |
| Package manager | npm | Dependency management |

---

## Folder Structure

```
playwrightAIdemo/
│
├── .github/
│   ├── agents/                          # GitHub Copilot AI agent definitions
│   │   ├── playwright-test-planner.agent.md
│   │   ├── playwright-test-generator.agent.md
│   │   └── playwright-test-healer.agent.md
│   └── workflows/
│       ├── playwright.yml               # CI: runs all tests on push/PR
│       └── copilot-setup-steps.yml      # CI: Copilot environment setup
│
├── config/
│   └── env.ts                           # Environment config (baseURL, etc.)
│
├── src/                                 # Reusable test infrastructure
│   ├── data/
│   │   ├── users.ts                     # Test credentials (admin, invalid)
│   │   ├── routes.ts                    # All application URL paths
│   │   └── expected.ts                  # Expected UI labels and counts
│   ├── fixtures/
│   │   ├── auth.fixture.ts              # loggedInPage Playwright fixture
│   │   └── index.ts                     # Re-exports
│   ├── pages/
│   │   ├── LoginPage.ts                 # Page Object: login page
│   │   ├── DashboardPage.ts             # Page Object: dashboard
│   │   └── index.ts                     # Re-exports
│   └── utils/
│       └── api.ts                       # API login utility (CSRF + session)
│
├── tests/                               # Test specs by domain
│   ├── api/                             # API-layer tests (no browser)
│   ├── auth/                            # Login, validation, credentials
│   ├── dashboard/                       # Dashboard widgets and layout
│   ├── navigation/                      # Sidebar menu and search
│   ├── quick-launch/                    # Quick launch shortcuts
│   ├── user-menu/                       # Profile dropdown, logout, about
│   └── seed.spec.ts                     # Agent entry point scaffold
│
├── specs/                               # IEEE 829 test plans (markdown)
├── reports/                             # Gitignored test output artifacts
├── playwright.config.ts                 # Playwright configuration
└── .github/workflows/                   # CI pipeline definitions
```

---

## Architecture Layers

### 1. Data Layer — `src/data/`
Single source of truth for all test inputs. No magic strings in specs.

- **`users.ts`** — credentials for admin and invalid user scenarios
- **`routes.ts`** — all application URL paths as typed constants
- **`expected.ts`** — UI labels, widget names, menu item lists

### 2. Page Object Model — `src/pages/`
Encapsulates all element selectors and page interactions. When the app UI changes, only the POM needs updating — not every spec file.

- **`LoginPage`** — `goto()`, `login()`, `attemptLogin()`, `submitEmpty()`
- **`DashboardPage`** — sidebar, user menu, topbar, search interactions

### 3. Fixture Layer — `src/fixtures/`
Playwright's native fixture system handles test setup and teardown. The `loggedInPage` fixture authenticates once and injects an authenticated page into any test that needs it.

```ts
// Any test can request an authenticated page like this:
test('example', async ({ loggedInPage }) => { ... });
```

### 4. Utility Layer — `src/utils/`
Pure functions with no browser dependency. `api.ts` performs a headless login via HTTP (CSRF token extraction → POST to `/auth/validate`) used by API-layer tests.

### 5. Test Specs — `tests/`
Organised by domain. Each spec imports from `src/` only — no inline selectors, no hardcoded strings, no duplicated setup logic.

### 6. AI Agent Layer — `.github/agents/`
Three specialised Copilot agents operate in sequence:

```
planner → generator → healer
```

| Agent | What it does |
|-------|-------------|
| `playwright-test-planner` | Navigates the live app, maps user flows, saves a markdown test plan to `specs/` |
| `playwright-test-generator` | Reads the plan, executes each step in a real browser via MCP, writes `.spec.ts` files |
| `playwright-test-healer` | Runs all tests, debugs failures, fixes selectors and assertions until green |

All agents connect to a live browser via the Playwright MCP server.

---

## CI Pipeline

```
push / PR to main
       │
       ├── Playwright Tests (playwright.yml)
       │     ├── Restore npm cache
       │     ├── Restore browser cache (keyed to package-lock.json)
       │     ├── Install Chromium only (on cache miss)
       │     ├── Run all tests
       │     └── Upload HTML report artifact
       │
       └── Copilot Setup Steps (copilot-setup-steps.yml)
             ├── Restore npm cache
             ├── Restore browser cache
             └── Install Chromium only (on cache miss)
```

Browser binaries are cached between runs — only re-downloaded when the Playwright version changes in `package-lock.json`. This reduces CI runtime from ~55 minutes to ~2 minutes on warm runs.

---

## Test Design Principles

- **Independence** — every test starts from a fresh browser context
- **No magic strings** — all selectors, routes, and labels come from `src/data/`
- **Fixture-based auth** — login is never duplicated across spec files
- **Page Objects** — UI changes require updates in one place only
- **Domain grouping** — specs are co-located with the feature they test
- **IEEE 829 aligned** — test plans in `specs/` follow the IEEE 829 standard

---

## Application Under Test

| Property | Value |
|----------|-------|
| Application | OrangeHRM Open Source v5.8 |
| URL | `https://opensource-demo.orangehrmlive.com` |
| Test credentials | Username: `Admin` / Password: `admin123` |
| Browser | Chromium (via Playwright) |
