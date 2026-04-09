// spec: specs/orangehrm-homepage-plan-ieee829.md#2.2
// seed: seed.spec.ts

import { test, expect } from '../../src/fixtures';
import { DashboardPage } from '../../src/pages';

test.describe('Sidebar Navigation', () => {
  test('Sidebar Search Filter', async ({ loggedInPage }) => {
    const dashboard = new DashboardPage(loggedInPage);

    // 1. Wait for sidebar to load then capture total menu item count
    await dashboard.menuItems.first().waitFor({ state: 'visible' });
    const totalCount = await dashboard.menuItems.count();
    expect(totalCount).toBeGreaterThan(1);

    // 2. Type "Leave" in the sidebar search input
    await dashboard.sidebarSearch.fill('Leave');

    // 3. Verify: Only the "Leave" menu item is shown
    await expect(dashboard.menuItems).toHaveCount(1);
    await expect(dashboard.menuItems.first()).toContainText('Leave');

    // 4. Clear the search input
    await dashboard.sidebarSearch.clear();

    // 5. Verify: All menu items are restored to original count
    await expect(dashboard.menuItems).toHaveCount(totalCount);
  });
});
