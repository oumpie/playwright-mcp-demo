# OrangeHRM Homepage & Dashboard Test Plan

## Application Overview

This test plan covers comprehensive testing of the OrangeHRM Open Source demo at opensource-demo.orangehrmlive.com. The application is an HR management system with authentication, dashboard, and various modules (Admin, PIM, Leave, My Info). The focus is on testing the login page (homepage), successful authentication flow, dashboard functionality, and user menu operations.

## Test Scenarios

### 1. Login Page & Authentication

**Seed:** `seed.spec.ts`

#### 1.1. Page Elements Display on Login

**File:** `tests/homepage/login-page-elements.spec.ts`

**Steps:**
  1. -
    - expect: OrangeHRM logo is visible
    - expect: Login heading is displayed
    - expect: Credentials hint text appears (Username: Admin, Password: admin123)
  2. -
    - expect: Username input field is present and focused
    - expect: Password input field is present
    - expect: Login button is visible
    - expect: Forgot your password link is clickable
  3. -
    - expect: Social login section with 'Or login with' text is displayed
    - expect: Social media links (LinkedIn, Facebook, Twitter, YouTube) are visible
    - expect: Footer copyright information is displayed
  4. -
    - expect: OrangeHRM version (OS 5.8) is shown in footer
    - expect: All elements load without JavaScript errors

#### 1.2. Successful Login with Valid Credentials

**File:** `tests/homepage/successful-login.spec.ts`

**Steps:**
  1. -
    - expect: User is on the login page at /web/index.php/auth/login
  2. -
    - expect: Username field accepts input 'Admin' without error
  3. -
    - expect: Password field accepts input 'admin123' without error
  4. -
    - expect: Login button is clickable and enabled
  5. -
    - expect: User is redirected to /web/index.php/dashboard/index after clicking Login
    - expect: Dashboard page loads successfully
    - expect: Page title remains 'OrangeHRM'

#### 1.3. Invalid Login Credentials

**File:** `tests/homepage/invalid-credentials.spec.ts`

**Steps:**
  1. -
    - expect: User is on the login page
  2. -
    - expect: Enter incorrect username 'InvalidUser' in username field
  3. -
    - expect: Enter incorrect password 'wrongpassword' in password field
  4. -
    - expect: Click the Login button
  5. -
    - expect: Error message is displayed indicating 'Invalid credentials'
    - expect: User remains on login page and is not redirected
    - expect: Username and password fields retain the entered values

#### 1.4. Empty Credentials Error

**File:** `tests/homepage/empty-credentials.spec.ts`

**Steps:**
  1. -
    - expect: User is on the login page
  2. -
    - expect: Leave both Username and Password fields empty
  3. -
    - expect: Click the Login button
  4. -
    - expect: Validation error is displayed
    - expect: User is not logged in and remains on login page
    - expect: Error message indicates required fields

#### 1.5. Forgot Password Link Navigation

**File:** `tests/homepage/forgot-password-link.spec.ts`

**Steps:**
  1. -
    - expect: User is on the login page
  2. -
    - expect: 'Forgot your password?' link is visible and clickable
  3. -
    - expect: Click on the 'Forgot your password?' link
  4. -
    - expect: User is navigated to the password recovery/reset page
    - expect: Page contains a form to enter username or email for password reset

#### 1.6. Social Login with John User

**File:** `tests/homepage/social-login.spec.ts`

**Steps:**
  1. -
    - expect: 'Or login with' section is displayed on login page
  2. -
    - expect: 'john' user option is visible and clickable
  3. -
    - expect: Click on 'john' user to auto-populate credentials
  4. -
    - expect: Username field is automatically filled with 'john' or related credentials
    - expect: User can proceed with login or manually enter additional information

#### 1.7. Social Media Links Functionality

**File:** `tests/homepage/social-media-links.spec.ts`

**Steps:**
  1. -
    - expect: LinkedIn link is present with correct URL
    - expect: Facebook link is present with correct URL
    - expect: Twitter link is present with correct URL
    - expect: YouTube link is present with correct URL
  2. -
    - expect: All social links have target='_blank' or equivalent
    - expect: Clicking social links does not affect login page state

### 2. Dashboard After Login

**Seed:** `seed.spec.ts`

#### 2.1. Dashboard Page Elements Load

**File:** `tests/homepage/dashboard-elements.spec.ts`

**Steps:**
  1. -
    - expect: User successfully logs in with valid credentials
    - expect: User is redirected to dashboard at /web/index.php/dashboard/index
  2. -
    - expect: OrangeHRM logo/branding is displayed in sidebar
    - expect: Sidebar search box is present and functional
    - expect: Navigation menu items are visible
  3. -
    - expect: Main content area displays 'Dashboard' heading
    - expect: 'Upgrade' button is visible in top right
    - expect: User profile section displays logged-in user name
  4. -
    - expect: All dashboard widgets load: My Actions, Quick Launch, Employees on Leave Today, Employee Distribution by Sub Unit, Employee Distribution by Location
    - expect: No JavaScript console errors are present

#### 2.2. Navigation Sidebar Functionality

**File:** `tests/homepage/sidebar-navigation.spec.ts`

**Steps:**
  1. -
    - expect: User is logged in and on the dashboard
  2. -
    - expect: Sidebar contains menu items: Admin, PIM, Leave, My Info, Dashboard
    - expect: All menu items are visible and properly formatted
  3. -
    - expect: Clicking 'Admin' link navigates to /web/index.php/admin/viewAdminModule
  4. -
    - expect: Clicking 'PIM' link navigates to /web/index.php/pim/viewPimModule
  5. -
    - expect: Clicking 'Leave' link navigates to /web/index.php/leave/viewLeaveModule
  6. -
    - expect: Clicking 'My Info' link navigates to /web/index.php/pim/viewMyDetails
  7. -
    - expect: Clicking 'Dashboard' link navigates back to /web/index.php/dashboard/index

#### 2.3. Quick Launch Links Navigation

**File:** `tests/homepage/quick-launch.spec.ts`

**Steps:**
  1. -
    - expect: User is logged in and on the dashboard
  2. -
    - expect: Quick Launch section is visible with buttons: 'Assign Leave', 'Leave List', 'Apply Leave', 'My Leave'
  3. -
    - expect: Clicking 'Assign Leave' navigates to the leave assignment page
  4. -
    - expect: Clicking 'Leave List' navigates to the leave list page
  5. -
    - expect: Clicking 'Apply Leave' navigates to the apply leave page
  6. -
    - expect: Clicking 'My Leave' navigates to the user's leave page

#### 2.4. Dashboard Widgets Content

**File:** `tests/homepage/dashboard-widgets.spec.ts`

**Steps:**
  1. -
    - expect: User is logged in and on the dashboard
  2. -
    - expect: 'My Actions' widget displays 'No Pending Actions to Perform' or shows actual pending actions
  3. -
    - expect: 'Employees on Leave Today' widget displays appropriate content or 'No Employees are on Leave Today'
  4. -
    - expect: 'Employee Distribution by Sub Unit' widget displays a list of sub units: Engineering, Human Resources, Administration, Sales & Marketing, Client Services, Unassigned
  5. -
    - expect: 'Employee Distribution by Location' widget displays locations: Texas R&D, New York Sales Office, Unassigned
  6. -
    - expect: All widgets are properly formatted with separators and icons

### 3. User Profile & Account Management

**Seed:** `seed.spec.ts`

#### 3.1. User Profile Menu Dropdown

**File:** `tests/homepage/profile-menu.spec.ts`

**Steps:**
  1. -
    - expect: User is logged in and on the dashboard
    - expect: User profile section is visible in the top right showing user name and profile picture
  2. -
    - expect: Click on the user profile area to open the dropdown menu
  3. -
    - expect: Profile dropdown menu appears with options: About, Support, Change Password, Logout
    - expect: All menu items are visible and properly styled

#### 3.2. About Dialog

**File:** `tests/homepage/about-dialog.spec.ts`

**Steps:**
  1. -
    - expect: User clicks on profile icon to open menu
  2. -
    - expect: Select 'About' from the dropdown menu
  3. -
    - expect: About dialog/modal appears
    - expect: Dialog displays application information including version number
    - expect: Dialog can be closed by clicking close button or outside the dialog

#### 3.3. Change Password Flow

**File:** `tests/homepage/change-password.spec.ts`

**Steps:**
  1. -
    - expect: User clicks on profile icon to open menu
  2. -
    - expect: Select 'Change Password' from the dropdown menu
  3. -
    - expect: Change Password page/form is displayed
    - expect: Form contains fields for current password and new password
    - expect: Submit button is available

#### 3.4. Logout Functionality

**File:** `tests/homepage/logout.spec.ts`

**Steps:**
  1. -
    - expect: User is logged in and on any authenticated page
  2. -
    - expect: Click on user profile area to open dropdown menu
  3. -
    - expect: Select 'Logout' from the menu
  4. -
    - expect: User is logged out and redirected to /web/index.php/auth/login
    - expect: Session is terminated
    - expect: User cannot access authenticated pages without logging in again

### 4. Edge Cases & Error Handling

**Seed:** `seed.spec.ts`

#### 4.1. Session Timeout Handling

**File:** `tests/homepage/session-timeout.spec.ts`

**Steps:**
  1. -
    - expect: User logs in successfully and is on the dashboard
  2. -
    - expect: Wait or simulate session timeout period
  3. -
    - expect: Try to access a protected resource or perform an action
    - expect: User is redirected to login page with appropriate message
    - expect: User can log in again

#### 4.2. Browser Back Button Behavior

**File:** `tests/homepage/browser-back-button.spec.ts`

**Steps:**
  1. -
    - expect: User is logged in and on the dashboard
  2. -
    - expect: Navigate to another page using sidebar menu
  3. -
    - expect: Click the browser back button
  4. -
    - expect: User is correctly taken back to the previous page
    - expect: Session remains active
    - expect: User data is preserved

#### 4.3. Page Refresh Maintains Session

**File:** `tests/homepage/refresh-session.spec.ts`

**Steps:**
  1. -
    - expect: User is logged in and on an authenticated page like dashboard
  2. -
    - expect: Refresh the page using F5 or Ctrl+R
  3. -
    - expect: Page reloads without redirecting to login
    - expect: User remains authenticated
    - expect: Dashboard content reloads properly

#### 4.4. Multiple Tabs Session Handling

**File:** `tests/homepage/multiple-tabs.spec.ts`

**Steps:**
  1. -
    - expect: User logs in and opens multiple tabs of the application
  2. -
    - expect: Perform actions in one tab (e.g., logout, change password)
  3. -
    - expect: Check status in other tabs
    - expect: Logout in one tab properly invalidates session across all tabs
    - expect: Session state is consistent

#### 4.5. Form Validation & Required Fields

**File:** `tests/homepage/form-validation.spec.ts`

**Steps:**
  1. -
    - expect: User is on the login page
  2. -
    - expect: Enter only username and leave password empty, then attempt to login
  3. -
    - expect: Validation error appears for password field
    - expect: Login is prevented
  4. -
    - expect: Enter only password and leave username empty, then attempt to login
  5. -
    - expect: Validation error appears for username field
    - expect: Login is prevented
