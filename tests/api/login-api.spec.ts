import { test, expect } from '@playwright/test';
import { apiLogin } from '../../src/utils/api';
import { ENV } from '../../config/env';
import { ROUTES } from '../../src/data/routes';
import { USERS } from '../../src/data/users';

test.describe('Authentication API', () => {
  test('Valid login redirects to dashboard', async ({ request }) => {
    const { cookie, redirectedTo } = await apiLogin(request, USERS.admin.username, USERS.admin.password);

    expect(redirectedTo).toContain('/dashboard/index');
    expect(cookie).toContain('orangehrm=');

    const dashboard = await request.get(
      `${ENV.baseURL}${ROUTES.dashboard}`,
      { headers: { Cookie: cookie }, maxRedirects: 0 }
    );
    expect(dashboard.status()).toBe(200);
  });

  test('Invalid login redirects back to login page', async ({ request }) => {
    const { redirectedTo } = await apiLogin(request, USERS.invalid.username, USERS.invalid.password);

    expect(redirectedTo).toContain('/auth/login');
    expect(redirectedTo).not.toContain('/dashboard');
  });
});
