# Dependency security maintenance

The browser library and distributed JS/CSS are unchanged. It has no runtime npm
dependencies. Development tests now require Node.js 22+ and Chromium through
Playwright. `npm test` remains the entry point; it checks JavaScript syntax and
runs the complete former QUnit suite plus pagination, search/reset, and destroy
regressions (four tests, nine assertions). QUnit is loaded from the local install.

The retired Grunt/PhantomJS dependencies and the unused Sauce Labs/connect
packages were removed. The Gruntfile only ran JSHint and QUnit; it did not build
or publish the library. The source passed the previous JSHint check before the
runner migration. The new entry point uses Node's syntax check and Chromium,
not the retired Grunt lint integration. There was no npm build script to retain.

Validation on 2026-10-18: Node 22.23.1, clean `npm ci --ignore-scripts`, `npm test`
(four QUnit tests, nine assertions), and `npm audit --json` (zero findings).
Install the browser with `npx playwright install chromium` first; fresh Linux
systems may require `npx playwright install --with-deps chromium`.

This audit covers the resolved npm development tree, not every browser-library
security property. Commit the lockfile and use `npm ci` for reproducibility.
