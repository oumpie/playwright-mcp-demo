// spec: specs/orangehrm-homepage-plan-ieee829.md#3.2
// seed: seed.spec.ts

import { test, expect } from '../../src/fixtures';
import { DashboardPage } from '../../src/pages';

test.describe('User Dropdown Menu', () => {
  test('About Dialog', async ({ loggedInPage }) => {
    const dashboard = new DashboardPage(loggedInPage);

    // 1. Open user dropdown
    await dashboard.openUserMenu();

    // 2. Click About
    await dashboard.clickUserMenuItem('About');

    // 3. Verify: Dialog is visible and shows OrangeHRM OS version
    await expect(loggedInPage.getByRole('dialog')).toBeVisible();
    await expect(loggedInPage.getByRole('dialog').getByText('OrangeHRM OS')).toBeVisible();

    // 4. Close the dialog
    await loggedInPage.getByRole('dialog').getByRole('button').click();

    // 5. Verify: Dashboard heading is still visible
    await expect(dashboard.heading).toBeVisible();
  });
});
