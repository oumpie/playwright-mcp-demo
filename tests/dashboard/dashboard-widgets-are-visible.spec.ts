// spec: specs/orangehrm-homepage-plan-ieee829.md#2.4
// seed: seed.spec.ts

import { test, expect } from '../../src/fixtures';
import { WIDGETS } from '../../src/data/expected';

test.describe('Dashboard Access & Layout', () => {
  test('Dashboard Widgets Are Visible', async ({ loggedInPage }) => {
    for (const widget of WIDGETS) {
      await expect(loggedInPage.getByText(widget)).toBeVisible();
    }
  });
});
