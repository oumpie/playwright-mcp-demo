// spec: specs/orangehrm-homepage-plan-ieee829.md#2.2
// seed: seed.spec.ts

import { test, expect } from '../../src/fixtures';
import { DashboardPage } from '../../src/pages';

test.describe('Sidebar Navigation', () => {
  test('Navigate to Each Main Menu Item', async ({ loggedInPage }) => {
    const dashboard = new DashboardPage(loggedInPage);

    // Admin
    await dashboard.clickSidebarLink('Admin');
    await expect(dashboard.topbarHeader).toContainText('Admin');

    // PIM
    await dashboard.clickSidebarLink('PIM');
    await expect(dashboard.topbarHeader).toContainText('PIM');

    // Leave
    await dashboard.clickSidebarLink('Leave');
    await expect(dashboard.topbarHeader).toContainText('Leave');

    // Time
    await dashboard.clickSidebarLink('Time');
    await expect(dashboard.topbarHeader).toContainText('Time');

    // Recruitment
    await dashboard.clickSidebarLink('Recruitment');
    await expect(dashboard.topbarHeader).toContainText('Recruitment');

    // Dashboard
    await dashboard.clickSidebarLink('Dashboard');
    await expect(loggedInPage).toHaveURL(/\/dashboard/);
  });
});
