import { type APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';
import { ROUTES } from '../data/routes';

/**
 * Authenticates via the OrangeHRM login form and returns the session cookie.
 * Flow: GET /auth/login → extract CSRF token → POST /auth/validate
 */
export async function apiLogin(
  request: APIRequestContext,
  username = 'Admin',
  password = 'admin123'
): Promise<{ cookie: string; redirectedTo: string }> {
  // 1. GET login page to obtain session cookie and CSRF token
  const loginPage = await request.get(`${ENV.baseURL}${ROUTES.login}`);
  const html = await loginPage.text();

  const tokenMatch = html.match(/:token="&quot;([^&]+)&quot;"/);
  if (!tokenMatch) {
    throw new Error('Could not extract CSRF token from login page');
  }
  const token = tokenMatch[1];

  // Extract session cookie from the login page response
  const setCookieHeader = loginPage.headers()['set-cookie'] ?? '';
  const sessionMatch = setCookieHeader.match(/orangehrm=([^;]+)/);
  const sessionCookie = sessionMatch ? `orangehrm=${sessionMatch[1]}` : '';

  // 2. POST credentials to /auth/validate
  const response = await request.post(
    `${ENV.baseURL}/web/index.php/auth/validate`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: sessionCookie,
      },
      data: `_token=${token}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      maxRedirects: 0,
    }
  );

  // Extract the new session cookie after login
  const postCookie = response.headers()['set-cookie'] ?? '';
  const newSessionMatch = postCookie.match(/orangehrm=([^;]+)/);
  const authCookie = newSessionMatch
    ? `orangehrm=${newSessionMatch[1]}`
    : sessionCookie;

  const redirectedTo = response.headers()['location'] ?? '';

  return { cookie: authCookie, redirectedTo };
}
