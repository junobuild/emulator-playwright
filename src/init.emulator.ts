import {test} from '@playwright/test';
import type {CliContextPageParams} from './page-objects/_cli-context.page';
import {CliPage} from './page-objects/cli.page';
import {ConsolePage} from './page-objects/console.page';

interface EmulatorSuitePages {
  consolePage: ConsolePage;
  cliPage: CliPage;
}

export const initEmulatorSuite = ({
  satelliteKind,
  cli
}: {
  satelliteKind: 'website' | 'application';
  cli?: CliContextPageParams & {cleanUp?: boolean};
}): (() => EmulatorSuitePages) => {
  let consolePage: ConsolePage;
  let cliPage: CliPage;

  test.beforeAll(async ({playwright}) => {
    test.setTimeout(120000);

    const browser = await playwright.chromium.launch();

    const context = await browser.newContext();
    const page = await context.newPage();

    consolePage = await ConsolePage.initWithSignIn({
      page,
      context,
      browser
    });

    await consolePage.createSatellite({kind: satelliteKind});

    const satelliteId = await consolePage.copySatelliteID();

    cliPage = await CliPage.initWithEmulatorLogin({satelliteId, command: cli?.command});
  });

  test.afterAll(async () => {
    const results = await Promise.allSettled([
      consolePage.close(),
      cliPage.close({cleanUp: cli?.cleanUp ?? true})
    ]);

    if (results.find(({status}) => status === 'rejected')) {
      console.error(results);
      throw new Error('Failed to close test suite!');
    }
  });

  return (): EmulatorSuitePages => ({
    consolePage,
    cliPage
  });
};
