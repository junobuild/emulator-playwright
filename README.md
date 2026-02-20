# @junobuild/emulator-playwright

A Playwright library to simplify the integration of the Juno Console and CLI in E2E tests.

## Page Objects

- **ConsolePage** — Interact with the Juno Console (sign in, create satellites, copy IDs, etc.)
- **CliPage** — Wrap the Juno CLI (login, deploy, snapshots, config management, etc.)
- **SatellitePage** — Interact with a deployed satellite project

## Test Suite Helpers

### `initEmulatorSuite`

Creates a full emulator test suite: signs in to the Console, creates a satellite, and logs in via the CLI.

```ts
const getPages = initEmulatorSuite({satelliteKind: 'website'});

test('...', async () => {
  const {consolePage, cliPage} = getPages();
});
```

### `initSatelliteSuite`

Lighter suite for tests that target an already-deployed satellite from the local config.

```ts
const getPages = initSatelliteSuite();

test('...', async () => {
  const {satelliteId, cliPage} = getPages();
});
```

## Requirements

- Juno emulator running locally
- `juno.config.ts` with a `<DEV_SATELLITE_ID>` placeholder
