import { test, expect } from '@playwright/test';
import { apiLogin } from '../../src/utils/api';
import { ENV } from '../../config/env';
import { ROUTES } from '../../src/data/routes';

test.describe('Quick Launch Routes API', () => {
  let cookie: string;

  test.beforeAll(async ({ request }) => {
    const result = await apiLogin(request);
    cookie = result.cookie;
  });

  test('Assign Leave route is accessible', async ({ request }) => {
    const response = await request.get(
      `${ENV.baseURL}${ROUTES.assignLeave}`,
      { headers: { Cookie: cookie }, maxRedirects: 0 }
    );
    expect(response.status()).toBe(200);
  });

  test('Leave List route is accessible', async ({ request }) => {
    const response = await request.get(
      `${ENV.baseURL}${ROUTES.leaveList}`,
      { headers: { Cookie: cookie }, maxRedirects: 0 }
    );
    expect(response.status()).toBe(200);
  });

  test('Timesheets route is accessible', async ({ request }) => {
    const response = await request.get(
      `${ENV.baseURL}${ROUTES.timesheets}`,
      { headers: { Cookie: cookie }, maxRedirects: 0 }
    );
    expect(response.status()).toBe(200);
  });
});
