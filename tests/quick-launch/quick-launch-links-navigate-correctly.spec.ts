// spec: specs/orangehrm-homepage-plan-ieee829.md#2.3
// seed: seed.spec.ts

import { test, expect } from '../../src/fixtures';
import { DashboardPage } from '../../src/pages';
import { ROUTES } from '../../src/data/routes';

test.describe('Quick Launch Shortcuts', () => {
  test('Quick Launch Links Navigate Correctly', async ({ loggedInPage }) => {
    const dashboard = new DashboardPage(loggedInPage);

    // 1. Click "Assign Leave" → verify URL
    await loggedInPage.getByRole('button', { name: 'Assign Leave' }).click();
    await expect(loggedInPage).toHaveURL(new RegExp(ROUTES.assignLeave));

    // 2. Return to Dashboard
    await dashboard.clickSidebarLink('Dashboard');
    await expect(loggedInPage).toHaveURL(/\/dashboard/);

    // 3. Click "Leave List" → verify URL
    await loggedInPage.getByRole('button', { name: 'Leave List' }).click();
    await expect(loggedInPage).toHaveURL(new RegExp(ROUTES.leaveList));

    // 4. Return to Dashboard
    await dashboard.clickSidebarLink('Dashboard');
    await expect(loggedInPage).toHaveURL(/\/dashboard/);

    // 5. Click "Timesheets" → verify URL
    await loggedInPage.getByRole('button', { name: 'Timesheets' }).click();
    await expect(loggedInPage).toHaveURL(new RegExp(ROUTES.timesheets));
  });
});
