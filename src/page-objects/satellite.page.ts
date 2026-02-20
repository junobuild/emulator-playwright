import {expect} from '@playwright/test';
import {TIMEOUT_AVERAGE} from '../constants/e2e.constants';
import {BrowserPage} from './_browser.page';

export class SatellitePage extends BrowserPage {
  async reload({title}: {title: string} = {title: 'Juno / Satellite'}): Promise<void> {
    await expect
      .poll(
        async () => {
          await this.page.reload({waitUntil: 'load'});
          return await this.page.title();
        },
        {
          ...TIMEOUT_AVERAGE,
          intervals: [1_000, 2_000, 10_000]
        }
      )
      .toBe(title);
  }

  async assertScreenshot(): Promise<void> {
    await expect(this.page).toHaveScreenshot({fullPage: true});
  }
}
