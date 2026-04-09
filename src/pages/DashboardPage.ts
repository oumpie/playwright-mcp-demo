import { type Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  get heading()       { return this.page.getByRole('heading', { name: 'Dashboard' }); }
  get sidebar()       { return this.page.getByRole('navigation', { name: 'Sidepanel' }); }
  get userDropdown()  { return this.page.locator('.oxd-userdropdown-tab'); }
  get sidebarSearch() { return this.page.getByPlaceholder('Search'); }
  get topbarHeader()  { return this.page.locator('.oxd-topbar-header-breadcrumb'); }
  get menuItems()     { return this.page.locator('.oxd-main-menu-item'); }

  async clickSidebarLink(name: string) {
    await this.page.getByRole('link', { name }).click();
  }

  async openUserMenu() {
    await this.userDropdown.click();
  }

  async clickUserMenuItem(name: string) {
    await this.page.getByRole('menuitem', { name }).click();
  }
}
