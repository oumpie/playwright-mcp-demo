# Test Plan: OrangeHRM Homepage & Dashboard
**Document ID:** TP-OHRM-001  
**Standard:** IEEE 829  
**Version:** 1.0  
**Date:** 2026-04-09  

---

## 1. Test Plan Identifier

**Plan ID:** TP-OHRM-001  
**Revision:** 1.0  
**Related Documents:** `specs/orangehrm-homepage-plan.md` (source test plan)

---

## 2. Introduction

This test plan describes the testing strategy and scope for the OrangeHRM Open Source HR Management System, accessible at `opensource-demo.orangehrmlive.com`. The plan covers end-to-end browser-based testing of the login page, dashboard, user profile management, and edge case/error handling scenarios. Tests are automated using Playwright.

**References:**
- OrangeHRM Open Source v5.8 — `opensource-demo.orangehrmlive.com`
- Seed file: `seed.spec.ts`
- Test spec output directory: `tests/homepage/`

---

## 3. Test Items

The following application components are under test:

| Item ID | Component | URL Path |
|---------|-----------|----------|
| TI-01 | Login Page | `/web/index.php/auth/login` |
| TI-02 | Dashboard | `/web/index.php/dashboard/index` |
| TI-03 | Admin Module | `/web/index.php/admin/viewAdminModule` |
| TI-04 | PIM Module | `/web/index.php/pim/viewPimModule` |
| TI-05 | Leave Module | `/web/index.php/leave/viewLeaveModule` |
| TI-06 | My Info Module | `/web/index.php/pim/viewMyDetails` |
| TI-07 | User Profile Menu | (dropdown in top-right of authenticated pages) |
| TI-08 | Change Password Page | (accessible via profile menu) |
| TI-09 | Forgot Password Page | (accessible via login page link) |

**Software Version Under Test:** OrangeHRM OS 5.8  
**Test Credentials:** Username: `Admin` / Password: `admin123`

---

## 4. Features to be Tested

| Feature ID | Feature Description |
|------------|---------------------|
| F-01 | Login page UI elements and layout |
| F-02 | Successful authentication with valid credentials |
| F-03 | Authentication rejection with invalid credentials |
| F-04 | Empty credential form validation |
| F-05 | Forgot password link navigation |
| F-06 | Social login user quick-fill (john user) |
| F-07 | Social media links presence and attributes |
| F-08 | Dashboard page elements post-login |
| F-09 | Sidebar navigation menu links |
| F-10 | Quick Launch widget navigation |
| F-11 | Dashboard widgets content rendering |
| F-12 | User profile dropdown menu |
| F-13 | About dialog display and dismissal |
| F-14 | Change password form display |
| F-15 | Logout and session termination |
| F-16 | Session timeout handling |
| F-17 | Browser back button behavior |
| F-18 | Page refresh session persistence |
| F-19 | Multi-tab session consistency |
| F-20 | Partial credential form validation |

---

## 5. Features Not to be Tested

| Feature | Reason |
|---------|--------|
| Admin module functionality (beyond navigation) | Out of scope for homepage/dashboard plan |
| PIM module internal features | Out of scope |
| Leave management workflows | Out of scope |
| Password reset email delivery | Requires email server integration |
| Actual social media OAuth flows | External third-party systems |
| Database-level session storage | Tested via application behavior only |
| Mobile / responsive layout | Not covered in this test cycle |
| Performance / load testing | Requires dedicated tooling |

---

## 6. Approach

**Strategy:** Black-box end-to-end browser automation using Playwright.

**Test Levels:** System testing (full stack, real browser).

**Test Types:**
- Functional testing — verifying UI behavior and navigation
- Negative testing — invalid inputs, empty fields, unauthorized access
- Boundary testing — session expiry, multi-tab behavior

**Execution Method:** Each scenario is executed in an isolated browser context starting from a fresh/blank state unless otherwise specified. Tests must be independent and executable in any order.

**Automation Framework:** Playwright (TypeScript)  
**MCP Integration:** Tests are generated and executed via the `playwright-test` MCP server (`npx playwright run-test-mcp-server`).

**Test Design Technique:** Use-case based scenarios covering happy paths, negative paths, and edge cases per feature.

---

## 7. Item Pass/Fail Criteria

### Pass Criteria
- All assertions within a test scenario produce the expected results.
- The application navigates to the correct URL after each user action.
- No unhandled JavaScript console errors are present during test execution.
- UI elements are visible, enabled, and correctly labelled.

### Fail Criteria
- Any assertion fails (element not found, unexpected URL, wrong text, etc.).
- The browser throws an unhandled exception.
- A test times out waiting for an expected element or navigation.
- The application crashes or returns an HTTP error during a scenario.

### Acceptable Defect Threshold
- Zero P1 (critical/blocker) defects for release sign-off.
- All failing tests must be triaged before the test cycle is closed.

---

## 8. Suspension Criteria and Resumption Requirements

### Suspension Criteria
Testing will be suspended if:
- The application login page is unavailable or returns an HTTP 5xx error.
- More than 30% of test scenarios fail due to a common infrastructure issue.
- The test environment credentials (`Admin` / `admin123`) stop working.

### Resumption Requirements
Testing may resume when:
- The root cause of the suspension is identified and resolved.
- The application is confirmed accessible and responsive.
- A new test cycle is initiated with a clean browser context.

---

## 9. Test Deliverables

| Deliverable | Description | Location |
|-------------|-------------|----------|
| Test Plan (source) | Original scenario-based test plan | `specs/orangehrm-homepage-plan.md` |
| Test Plan (IEEE 829) | This document | `specs/orangehrm-homepage-plan-ieee829.md` |
| Test Spec Files | Generated Playwright `.spec.ts` files | `tests/homepage/*.spec.ts` |
| Test Seed File | Base test scaffold | `seed.spec.ts` |
| Test Results | Playwright HTML report (post-execution) | `playwright-report/` |

---

## 10. Testing Tasks

| Task ID | Task Description | Agent / Owner |
|---------|-----------------|---------------|
| TT-01 | Explore application and generate test plan | `playwright-test-planner` agent |
| TT-02 | Generate Playwright spec files from test plan | `playwright-test-generator` agent |
| TT-03 | Execute all test specs | Playwright test runner |
| TT-04 | Debug and fix failing tests | `playwright-test-healer` agent |
| TT-05 | Review test results and report defects | QA reviewer |

---

## 11. Environmental Needs

| Requirement | Detail |
|-------------|--------|
| Application URL | `https://opensource-demo.orangehrmlive.com` |
| Browser | Chromium (default), Firefox, WebKit (via Playwright) |
| Node.js | v18+ |
| Playwright version | As installed in `node_modules/playwright` |
| Network | Internet access required (SaaS demo app) |
| Test credentials | Username: `Admin`, Password: `admin123` |
| MCP Server | `npx playwright run-test-mcp-server` |

---

## 12. Responsibilities

| Role | Responsibility |
|------|---------------|
| Test Planner Agent | Explore app, produce scenario plan |
| Test Generator Agent | Produce Playwright spec files from plan |
| Test Healer Agent | Debug and auto-fix failing specs |
| QA Reviewer | Review generated specs, validate coverage, triage failures |
| Developer | Fix application defects identified during testing |

---

## 13. Staffing and Training Needs

- QA engineers must be familiar with Playwright (TypeScript) to review and maintain generated specs.
- No manual testing skills are required for automated execution; agents handle execution autonomously.
- Familiarity with the GitHub Copilot agent framework is required to operate the planner/generator/healer agents.

---

## 14. Schedule

| Milestone | Task |
|-----------|------|
| Phase 1 | Test planning — planner agent explores app and saves plan |
| Phase 2 | Test generation — generator agent produces `.spec.ts` files |
| Phase 3 | Test execution — Playwright runs all specs |
| Phase 4 | Test healing — healer agent fixes failures |
| Phase 5 | Results review and defect reporting |

> Note: No fixed dates are assigned as this is a demo/automated pipeline. Phases execute sequentially per agent handoff.

---

## 15. Risks and Contingencies

| Risk ID | Risk | Likelihood | Impact | Contingency |
|---------|------|------------|--------|-------------|
| R-01 | Demo app credentials change | Medium | High | Update credentials in seed file and re-run generation |
| R-02 | Demo app UI changes break selectors | High | Medium | Run healer agent to auto-fix locators |
| R-03 | Demo app is down or rate-limited | Low | High | Retry after delay; use local OrangeHRM instance if available |
| R-04 | Generated tests are flaky due to timing | Medium | Medium | Healer agent adds robust waits; avoid `networkidle` |
| R-05 | Social login or OAuth flows change | Medium | Low | Mark affected tests as `test.fixme()` with explanation |

---

## 16. Test Scenarios

### 1. Login Page & Authentication

**Seed:** `seed.spec.ts`

---

#### 1.1 Page Elements Display on Login

**File:** `tests/homepage/login-page-elements.spec.ts`  
**Feature:** F-01  
**Type:** Functional  

**Steps:**
1. Navigate to the login page.
   - expect: OrangeHRM logo is visible
   - expect: Login heading is displayed
   - expect: Credentials hint text appears (Username: Admin, Password: admin123)
2. Inspect form fields.
   - expect: Username input field is present and focused
   - expect: Password input field is present
   - expect: Login button is visible
   - expect: Forgot your password link is clickable
3. Inspect social login section.
   - expect: Social login section with 'Or login with' text is displayed
   - expect: Social media links (LinkedIn, Facebook, Twitter, YouTube) are visible
   - expect: Footer copyright information is displayed
4. Inspect footer.
   - expect: OrangeHRM version (OS 5.8) is shown in footer
   - expect: All elements load without JavaScript errors

---

#### 1.2 Successful Login with Valid Credentials

**File:** `tests/homepage/successful-login.spec.ts`  
**Feature:** F-02  
**Type:** Functional  

**Steps:**
1. Navigate to the login page.
   - expect: User is on `/web/index.php/auth/login`
2. Enter username.
   - expect: Username field accepts input 'Admin' without error
3. Enter password.
   - expect: Password field accepts input 'admin123' without error
4. Click Login button.
   - expect: Login button is clickable and enabled
5. Verify redirect.
   - expect: User is redirected to `/web/index.php/dashboard/index`
   - expect: Dashboard page loads successfully
   - expect: Page title remains 'OrangeHRM'

---

#### 1.3 Invalid Login Credentials

**File:** `tests/homepage/invalid-credentials.spec.ts`  
**Feature:** F-03  
**Type:** Negative  

**Steps:**
1. Navigate to the login page.
   - expect: User is on the login page
2. Enter invalid username.
   - expect: Enter 'InvalidUser' in username field
3. Enter invalid password.
   - expect: Enter 'wrongpassword' in password field
4. Click Login button.
   - expect: Login button is clicked
5. Verify error state.
   - expect: Error message is displayed indicating 'Invalid credentials'
   - expect: User remains on login page and is not redirected
   - expect: Username and password fields retain the entered values

---

#### 1.4 Empty Credentials Error

**File:** `tests/homepage/empty-credentials.spec.ts`  
**Feature:** F-04  
**Type:** Negative  

**Steps:**
1. Navigate to the login page.
   - expect: User is on the login page
2. Leave both fields empty.
   - expect: Username and Password fields are empty
3. Click Login button.
   - expect: Validation error is displayed
   - expect: User is not logged in and remains on login page
   - expect: Error message indicates required fields

---

#### 1.5 Forgot Password Link Navigation

**File:** `tests/homepage/forgot-password-link.spec.ts`  
**Feature:** F-05  
**Type:** Functional  

**Steps:**
1. Navigate to the login page.
   - expect: User is on the login page
2. Locate link.
   - expect: 'Forgot your password?' link is visible and clickable
3. Click the link.
   - expect: User is navigated to the password recovery/reset page
   - expect: Page contains a form to enter username or email for password reset

---

#### 1.6 Social Login with John User

**File:** `tests/homepage/social-login.spec.ts`  
**Feature:** F-06  
**Type:** Functional  

**Steps:**
1. Verify social login section.
   - expect: 'Or login with' section is displayed on login page
2. Locate john user option.
   - expect: 'john' user option is visible and clickable
3. Click john user.
   - expect: Username field is automatically filled with 'john' or related credentials
   - expect: User can proceed with login or manually enter additional information

---

#### 1.7 Social Media Links Functionality

**File:** `tests/homepage/social-media-links.spec.ts`  
**Feature:** F-07  
**Type:** Functional  

**Steps:**
1. Verify all social links are present.
   - expect: LinkedIn link is present with correct URL
   - expect: Facebook link is present with correct URL
   - expect: Twitter link is present with correct URL
   - expect: YouTube link is present with correct URL
2. Verify link attributes.
   - expect: All social links have `target='_blank'` or equivalent
   - expect: Clicking social links does not affect login page state

---

### 2. Dashboard After Login

**Seed:** `seed.spec.ts`

---

#### 2.1 Dashboard Page Elements Load

**File:** `tests/homepage/dashboard-elements.spec.ts`  
**Feature:** F-08  
**Type:** Functional  

**Steps:**
1. Login with valid credentials.
   - expect: User successfully logs in
   - expect: User is redirected to `/web/index.php/dashboard/index`
2. Verify sidebar.
   - expect: OrangeHRM logo/branding is displayed in sidebar
   - expect: Sidebar search box is present and functional
   - expect: Navigation menu items are visible
3. Verify main content area.
   - expect: Main content area displays 'Dashboard' heading
   - expect: 'Upgrade' button is visible in top right
   - expect: User profile section displays logged-in user name
4. Verify widgets.
   - expect: All dashboard widgets load: My Actions, Quick Launch, Employees on Leave Today, Employee Distribution by Sub Unit, Employee Distribution by Location
   - expect: No JavaScript console errors are present

---

#### 2.2 Navigation Sidebar Functionality

**File:** `tests/homepage/sidebar-navigation.spec.ts`  
**Feature:** F-09  
**Type:** Functional  

**Steps:**
1. Login and confirm dashboard.
   - expect: User is logged in and on the dashboard
2. Verify sidebar items.
   - expect: Sidebar contains: Admin, PIM, Leave, My Info, Dashboard
3. Click Admin.
   - expect: Navigates to `/web/index.php/admin/viewAdminModule`
4. Click PIM.
   - expect: Navigates to `/web/index.php/pim/viewPimModule`
5. Click Leave.
   - expect: Navigates to `/web/index.php/leave/viewLeaveModule`
6. Click My Info.
   - expect: Navigates to `/web/index.php/pim/viewMyDetails`
7. Click Dashboard.
   - expect: Navigates back to `/web/index.php/dashboard/index`

---

#### 2.3 Quick Launch Links Navigation

**File:** `tests/homepage/quick-launch.spec.ts`  
**Feature:** F-10  
**Type:** Functional  

**Steps:**
1. Login and confirm dashboard.
   - expect: User is logged in and on the dashboard
2. Verify Quick Launch buttons.
   - expect: Buttons visible: 'Assign Leave', 'Leave List', 'Apply Leave', 'My Leave'
3. Click Assign Leave.
   - expect: Navigates to the leave assignment page
4. Click Leave List.
   - expect: Navigates to the leave list page
5. Click Apply Leave.
   - expect: Navigates to the apply leave page
6. Click My Leave.
   - expect: Navigates to the user's leave page

---

#### 2.4 Dashboard Widgets Content

**File:** `tests/homepage/dashboard-widgets.spec.ts`  
**Feature:** F-11  
**Type:** Functional  

**Steps:**
1. Login and confirm dashboard.
   - expect: User is logged in and on the dashboard
2. Verify My Actions widget.
   - expect: Displays 'No Pending Actions to Perform' or actual pending actions
3. Verify Employees on Leave widget.
   - expect: Displays appropriate content or 'No Employees are on Leave Today'
4. Verify Employee Distribution by Sub Unit widget.
   - expect: Displays sub units: Engineering, Human Resources, Administration, Sales & Marketing, Client Services, Unassigned
5. Verify Employee Distribution by Location widget.
   - expect: Displays locations: Texas R&D, New York Sales Office, Unassigned
6. Verify formatting.
   - expect: All widgets are properly formatted with separators and icons

---

### 3. User Profile & Account Management

**Seed:** `seed.spec.ts`

---

#### 3.1 User Profile Menu Dropdown

**File:** `tests/homepage/profile-menu.spec.ts`  
**Feature:** F-12  
**Type:** Functional  

**Steps:**
1. Login and confirm dashboard.
   - expect: User profile section is visible in the top right showing user name and profile picture
2. Click profile area.
   - expect: Dropdown menu opens
3. Verify dropdown options.
   - expect: Menu shows: About, Support, Change Password, Logout
   - expect: All menu items are visible and properly styled

---

#### 3.2 About Dialog

**File:** `tests/homepage/about-dialog.spec.ts`  
**Feature:** F-13  
**Type:** Functional  

**Steps:**
1. Open profile menu.
   - expect: Profile dropdown is open
2. Click About.
   - expect: About dialog/modal appears
   - expect: Dialog displays application information including version number
3. Dismiss dialog.
   - expect: Dialog can be closed by clicking close button or outside the dialog

---

#### 3.3 Change Password Flow

**File:** `tests/homepage/change-password.spec.ts`  
**Feature:** F-14  
**Type:** Functional  

**Steps:**
1. Open profile menu.
   - expect: Profile dropdown is open
2. Click Change Password.
   - expect: Change Password page/form is displayed
   - expect: Form contains fields for current password and new password
   - expect: Submit button is available

---

#### 3.4 Logout Functionality

**File:** `tests/homepage/logout.spec.ts`  
**Feature:** F-15  
**Type:** Functional  

**Steps:**
1. Login and navigate to an authenticated page.
   - expect: User is on any authenticated page
2. Open profile dropdown.
   - expect: Dropdown menu opens
3. Click Logout.
   - expect: User is logged out and redirected to `/web/index.php/auth/login`
   - expect: Session is terminated
   - expect: User cannot access authenticated pages without logging in again

---

### 4. Edge Cases & Error Handling

**Seed:** `seed.spec.ts`

---

#### 4.1 Session Timeout Handling

**File:** `tests/homepage/session-timeout.spec.ts`  
**Feature:** F-16  
**Type:** Edge Case  

**Steps:**
1. Login successfully.
   - expect: User is on the dashboard
2. Simulate or wait for session timeout.
   - expect: Session expires
3. Attempt to access a protected resource.
   - expect: User is redirected to login page with appropriate message
   - expect: User can log in again

---

#### 4.2 Browser Back Button Behavior

**File:** `tests/homepage/browser-back-button.spec.ts`  
**Feature:** F-17  
**Type:** Edge Case  

**Steps:**
1. Login and navigate to another page via sidebar.
   - expect: User is on a secondary module page
2. Click browser back button.
   - expect: User is taken back to the previous page
   - expect: Session remains active
   - expect: User data is preserved

---

#### 4.3 Page Refresh Maintains Session

**File:** `tests/homepage/refresh-session.spec.ts`  
**Feature:** F-18  
**Type:** Edge Case  

**Steps:**
1. Login and land on dashboard.
   - expect: User is authenticated and on dashboard
2. Refresh the page (F5 or Ctrl+R).
   - expect: Page reloads without redirecting to login
   - expect: User remains authenticated
   - expect: Dashboard content reloads properly

---

#### 4.4 Multiple Tabs Session Handling

**File:** `tests/homepage/multiple-tabs.spec.ts`  
**Feature:** F-19  
**Type:** Edge Case  

**Steps:**
1. Login and open multiple tabs.
   - expect: All tabs reflect authenticated state
2. Perform logout in one tab.
   - expect: Session is terminated
3. Check other tabs.
   - expect: Logout in one tab properly invalidates session across all tabs
   - expect: Session state is consistent

---

#### 4.5 Form Validation & Required Fields

**File:** `tests/homepage/form-validation.spec.ts`  
**Feature:** F-20  
**Type:** Negative  

**Steps:**
1. Navigate to login page.
   - expect: User is on the login page
2. Enter only username, leave password empty, attempt login.
   - expect: Validation error appears for password field
   - expect: Login is prevented
3. Clear fields, enter only password, leave username empty, attempt login.
   - expect: Validation error appears for username field
   - expect: Login is prevented

---

## 17. Approvals

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Test Manager | | | |
| QA Lead | | | |
| Project Manager | | | |
| Developer Lead | | | |
