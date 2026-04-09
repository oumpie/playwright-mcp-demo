// spec: specs/orangehrm-homepage-plan-ieee829.md#1.2
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages';
import { DashboardPage } from '../../src/pages';
import { USERS } from '../../src/data/users';

test.describe('Authentication', () => {
  test('Successful Login and Dashboard Load', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    // 1. Navigate to login page
    await loginPage.goto();

    // 2. Enter valid credentials and click Login
    await loginPage.login(USERS.admin.username, USERS.admin.password);

    // 3. Verify: URL contains /dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // 4. Verify: Dashboard heading is visible
    await expect(dashboard.heading).toBeVisible();

    // 5. Verify: Sidebar navigation is visible
    await expect(dashboard.sidebar).toBeVisibleSHOULDFAIL();
  });
});
