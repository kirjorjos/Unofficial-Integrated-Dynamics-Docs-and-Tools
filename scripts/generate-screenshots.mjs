import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";

const specs = readdirSync("ui-tests")
  .filter((file) => file.endsWith(".test.ts"))
  .filter((file) =>
    readFileSync(`ui-tests/${file}`, "utf8").includes("toHaveScreenshot")
  )
  .map((file) => `ui-tests/${file}`);

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const runPlaywright = (args, capture = false) =>
  spawnSync("npx", ["playwright", "test", ...args], {
    env: { ...process.env, LOCAL_SNAPSHOTS: "1" },
    stdio: capture ? ["inherit", "pipe", "inherit"] : "inherit",
  });

const walkSpecs = (suites, visit) => {
  for (const suite of suites ?? []) {
    for (const spec of suite.specs ?? []) visit(spec);
    walkSpecs(suite.suites ?? [], visit);
  }
};

const collectFailures = () => {
  const outputDir = mkdtempSync(path.join(os.tmpdir(), "snapshot-check-"));
  const check = runPlaywright(
    [...specs, "--reporter=json", `--output=${outputDir}`],
    true
  );

  let report;
  try {
    report = JSON.parse(check.stdout.toString());
  } catch {
    console.error(
      "Failed to parse playwright output — aborting without touching snapshots."
    );
    process.exit(check.status ?? 1);
  }

  const changed = new Map();
  const screenshotFailures = new Set();
  const otherFailures = [];

  walkSpecs(report.suites, (spec) => {
    for (const test of spec.tests ?? []) {
      const results = test.results ?? [];
      const finalResult = results[results.length - 1];
      if (!finalResult) continue;
      if (
        finalResult.status !== "failed" &&
        finalResult.status !== "timedOut"
      ) {
        continue;
      }

      const names = new Set();
      for (const error of finalResult.errors ?? []) {
        const match = error.message?.match(
          /A snapshot doesn't exist at .*\/([^/]+\.png)/
        );
        if (match) names.add(match[1]);
      }
      for (const attachment of finalResult.attachments ?? []) {
        const match = attachment.name?.match(
          /^(.+)-(?:actual|expected|diff)\.png$/
        );
        if (match) names.add(`${match[1]}.png`);
      }

      if (names.size > 0) {
        for (const name of names) {
          changed.set(name, { title: spec.title, specFile: spec.file });
        }
        screenshotFailures.add(spec.title);
      } else {
        otherFailures.push(spec.title);
      }
    }
  });

  rmSync(outputDir, { recursive: true, force: true });
  return { changed, screenshotFailures, otherFailures };
};

const reportOtherFailures = (otherFailures) => {
  if (otherFailures.length > 0) {
    console.error(
      `\n⚠ ${otherFailures.length} test(s) failed for non-screenshot reasons and were NOT regenerated:`
    );
    for (const title of otherFailures) {
      console.error(`  - ${title}`);
    }
  }
};

if (!existsSync(".local-snapshots")) {
  console.log(
    `No .local-snapshots/ found — regenerating all snapshots (${specs.length} specs):`
  );
  for (const spec of specs) {
    console.log(`  - ${spec}`);
  }
  const result = runPlaywright([...specs, "--update-snapshots"]);
  process.exit(result.status ?? 1);
}

const { changed, screenshotFailures, otherFailures } = collectFailures();

if (changed.size === 0) {
  console.log(
    "All snapshots are up to date — nothing to regenerate." +
      (otherFailures.length > 0
        ? ` (${otherFailures.length} other test failure(s))`
        : "")
  );
  process.exit(otherFailures.length > 0 ? 1 : 0);
}

// Phase 2: regenerate only the tests whose snapshots failed.
const grep = [...screenshotFailures].map(escapeRegex).join("|");
console.log(`\nRegenerating ${changed.size} changed snapshot(s):`);
for (const name of [...changed.keys()].sort()) {
  const { specFile } = changed.get(name);
  console.log(`  - ${path.basename(specFile)}/${name}`);
}

const regen = runPlaywright([
  ...specs,
  "-g",
  grep,
  "--update-snapshots",
  "--reporter=line",
]);

if (regen.status !== 0) {
  reportOtherFailures(otherFailures);
  process.exit(regen.status ?? 1);
}

const verify = collectFailures();

if (verify.changed.size === 0) {
  console.log(
    `\nVerified: all ${changed.size} regenerated snapshot(s) are clean.`
  );
  reportOtherFailures(verify.otherFailures);
  process.exit(verify.otherFailures.length > 0 ? 1 : 0);
}

console.error(`
  ${verify.changed.size} snapshot(s) still differ after regeneration — the baseline run and the verification run disagreed (transient rendering?):`);
for (const name of [...verify.changed.keys()].sort()) {
  const { specFile } = verify.changed.get(name);
  console.error(`  - ${path.basename(specFile)}/${name}`);
}
console.error("Re-run `npm run generate` to retry.");
reportOtherFailures(verify.otherFailures);
process.exit(1);
