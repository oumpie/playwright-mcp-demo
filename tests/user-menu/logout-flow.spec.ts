// spec: specs/orangehrm-homepage-plan-ieee829.md#3.4
// seed: seed.spec.ts

import { test, expect } from '../../src/fixtures';
import { DashboardPage } from '../../src/pages';
import { ROUTES } from '../../src/data/routes';
import { USER_MENU_ITEMS } from '../../src/data/expected';

test.describe('User Dropdown Menu', () => {
  test('Logout Flow', async ({ loggedInPage }) => {
    const dashboard = new DashboardPage(loggedInPage);

    // 1. Open user dropdown
    await dashboard.openUserMenu();

    // 2. Verify all expected menu items are present
    for (const item of USER_MENU_ITEMS) {
      await expect(loggedInPage.getByRole('menuitem', { name: item })).toBeVisible();
    }

    // 3. Click Logout
    await dashboard.clickUserMenuItem('Logout');

    // 4. Verify: Redirected to login page
    await expect(loggedInPage).toHaveURL(new RegExp(ROUTES.login));

    // 5. Verify: Login form is visible
    await expect(loggedInPage.getByPlaceholder('Username')).toBeVisible();
  });
});
