import { test, expect } from '@playwright/test';
import { apiLogin } from '../../src/utils/api';
import { ENV } from '../../config/env';
import { ROUTES } from '../../src/data/routes';

test.describe('Logout API', () => {
  test('Logout invalidates session', async ({ request }) => {
    // 1. Login to get an authenticated session
    const { cookie } = await apiLogin(request);

    // 2. Verify session is valid — dashboard returns 200
    const dashboardBefore = await request.get(
      `${ENV.baseURL}${ROUTES.dashboard}`,
      { headers: { Cookie: cookie }, maxRedirects: 0 }
    );
    expect(dashboardBefore.status()).toBe(200);

    // 3. Hit the logout endpoint
    const logoutResponse = await request.get(
      `${ENV.baseURL}${ROUTES.logout}`,
      { headers: { Cookie: cookie }, maxRedirects: 0 }
    );
    expect(logoutResponse.status()).toBe(302);
    expect(logoutResponse.headers()['location']).toContain('/auth/login');

    // 4. Verify session is invalidated — dashboard now redirects to login
    const dashboardAfter = await request.get(
      `${ENV.baseURL}${ROUTES.dashboard}`,
      { headers: { Cookie: cookie }, maxRedirects: 0 }
    );
    expect(dashboardAfter.status()).toBe(302);
    expect(dashboardAfter.headers()['location']).toContain('/auth/login');
  });
});
