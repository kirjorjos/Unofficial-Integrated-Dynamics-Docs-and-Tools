import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
const outputDirArg = args.find((a) => a.startsWith("--outputDir="));
const forwarded = args.filter(
  (a) => !a.startsWith("--outputDir=") && !a.startsWith("--output=")
);

if (!fs.existsSync(".local-snapshots")) {
  console.warn(
    "\n[run-visual-tests] No .local-snapshots/ found — run `npm run generate` first to build the local screenshot baselines.\n"
  );
}

let outputDir;
let tempDir = null;

if (outputDirArg) {
  outputDir = outputDirArg.slice("--outputDir=".length);
  fs.mkdirSync(outputDir, { recursive: true });
} else {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "visual-test-results-"));
  outputDir = tempDir;
}

try {
  const result = spawnSync(
    "npx",
    ["playwright", "test", ...forwarded, `--output=${outputDir}`],
    {
      stdio: "inherit",
      // npm test is the local loop: always compare against the gitignored
      // sandbox (.local-snapshots/). CI never runs this wrapper — node-test,
      // post-merge-sync, and deploy's build:ci all invoke `npx playwright test`
      // directly, which keeps the committed baselines (src/assets/visual-snapshots/).
      env: { ...process.env, LOCAL_SNAPSHOTS: "1" },
    }
  );
  process.exit(result.status ?? 1);
} finally {
  if (tempDir) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
