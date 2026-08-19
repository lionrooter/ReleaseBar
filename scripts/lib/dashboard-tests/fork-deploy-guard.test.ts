import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const officialRepo = "steipete/ReleaseBar";
const steipeteAccountId = "de09342a728de2c25c85cc6b34d68739";

test("fork Deploy workflow cannot wrangler-deploy or smoke release.bar", async () => {
  const workflow = await readFile(".github/workflows/deploy.yml", "utf8");
  assert.match(
    workflow,
    new RegExp(
      String.raw`cloudflare:\n(?: {4}.*\n)* {4}if: github\.repository == '${officialRepo}'`,
    ),
  );
  assert.match(workflow, /if: github\.repository != 'steipete\/ReleaseBar'/);
  assert.match(workflow, /This fork must not wrangler-deploy or smoke https:\/\/release\.bar\./);
});

test("fork Monitor workflow cannot smoke release.bar", async () => {
  const workflow = await readFile(".github/workflows/monitor.yml", "utf8");
  assert.match(workflow, new RegExp(`if: github\\.repository == '${officialRepo}'`));
  assert.match(workflow, /if: github\.repository != 'steipete\/ReleaseBar'/);
});

test("Lionroot product config is not reverted to upstream defaults", async () => {
  const config = JSON.parse(await readFile("releasebar.config.json", "utf8")) as {
    title: string;
    canonicalDomain: string;
    includeUnreleased?: boolean;
    includeForks?: boolean;
    includeArchived?: boolean;
    owners: Array<{ type: string; login: string }>;
  };
  assert.equal(config.title, "Lionroot ReleaseBar");
  assert.equal(config.canonicalDomain, "releasebar.lionroot.ai");
  assert.equal(config.includeUnreleased, true);
  assert.equal(config.includeForks, false);
  assert.equal(config.includeArchived, false);
  assert.deepEqual(
    config.owners.map((owner) => `${owner.type}:${owner.login}`),
    [
      "user:lionrooter",
      "org:openclaw",
      "org:lionroot-game-dev",
      "org:fisher-family-code",
      "org:lionroot-studio",
    ],
  );
});

test("wrangler.toml stays on the Lionroot worker and OpenClaw account", async () => {
  const wrangler = await readFile("wrangler.toml", "utf8");
  assert.match(wrangler, /^name = "lionroot-releasebar"$/m);
  assert.match(wrangler, /^account_id = "91b59577e757131d68d55a471fe32aca"$/m);
  assert.doesNotMatch(wrangler, /releasedeck-api/);
  assert.doesNotMatch(wrangler, new RegExp(steipeteAccountId));
});
