// spec: specs/orangehrm-homepage-plan-ieee829.md#1.3
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages';
import { USERS } from '../../src/data/users';
import { ROUTES } from '../../src/data/routes';

test.describe('Authentication', () => {
  test('Invalid Login Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Navigate to login page
    await loginPage.goto();

    // 2. Enter invalid credentials and submit
    await loginPage.attemptLogin(USERS.invalid.username, USERS.invalid.password);

    // 3. Verify: Error alert is shown with "Invalid credentials"
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert).toContainText('Invalid credentials');

    // 4. Verify: User remains on login page
    await expect(page).toHaveURL(new RegExp(ROUTES.login));
  });
});
