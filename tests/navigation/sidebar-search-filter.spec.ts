// spec: specs/orangehrm-homepage-plan-ieee829.md#2.2
// seed: seed.spec.ts

import { test, expect } from '../../src/fixtures';
import { DashboardPage } from '../../src/pages';

test.describe('Sidebar Navigation', () => {
  test('Sidebar Search Filter', async ({ loggedInPage }) => {
    const dashboard = new DashboardPage(loggedInPage);

    // 1. Type "Leave" in the sidebar search input
    await dashboard.sidebarSearch.fill('Leave');

    // 2. Verify: Only the "Leave" menu item is shown
    await expect(dashboard.menuItems).toHaveCount(1);
    await expect(dashboard.menuItems.first()).toContainText('Leave');

    // 3. Clear the search input
    await dashboard.sidebarSearch.clear();

    // 4. Verify: All 11 menu items are visible again
    await expect(dashboard.menuItems).toHaveCount(11);
  });
});
