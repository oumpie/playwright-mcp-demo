// spec: specs/orangehrm-homepage-plan-ieee829.md#1.4
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages';

test.describe('Authentication', () => {
  test('Empty Credentials Shows Validation Errors', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Navigate to login page
    await loginPage.goto();

    // 2. Click Login without entering any credentials
    await loginPage.submitEmpty();

    // 3. Verify: Two "Required" validation messages appear
    const requiredMessages = page.getByText('Required');
    await expect(requiredMessages).toHaveCount(2);
  });
});
