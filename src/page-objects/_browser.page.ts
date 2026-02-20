import type {Browser, BrowserContext, Page} from '@playwright/test';

export interface BrowserPageParams {
  page: Page;
  context: BrowserContext;
  browser: Browser;
}

export abstract class BrowserPage {
  protected readonly page: Page;
  protected readonly context: BrowserContext;
  protected readonly browser: Browser;

  protected constructor({page, context, browser}: BrowserPageParams) {
    this.page = page;
    this.context = context;
    this.browser = browser;
  }

  async close(): Promise<void> {
    await this.page.close();
  }
}
