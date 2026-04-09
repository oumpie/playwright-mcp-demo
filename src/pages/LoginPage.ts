import { type Page, expect } from '@playwright/test';
import { ROUTES } from '../data/routes';

export class LoginPage {
  constructor(private page: Page) {}

  get usernameInput() { return this.page.getByPlaceholder('Username'); }
  get passwordInput() { return this.page.getByPlaceholder('Password'); }
  get loginButton()   { return this.page.getByRole('button', { name: 'Login' }); }
  get errorAlert()    { return this.page.locator('.oxd-alert'); }

  async goto() {
    await this.page.goto(ROUTES.login, { waitUntil: 'domcontentloaded' });
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
  }

  async submitEmpty() {
    await this.loginButton.click();
  }

  async attemptLogin(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
