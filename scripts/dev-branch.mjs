import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmp = path.join(os.tmpdir(), `dev-branch-${process.pid}.cjs`);

await build({
  entryPoints: [path.join(root, "src/lib/pagesDeploy/branchPattern.ts")],
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node20",
  outfile: tmp,
  logLevel: "warning",
});

const require = createRequire(import.meta.url);
const { isServedBranch, normalizeBase } = require(tmp);
fs.rmSync(tmp, { force: true });

const branch = process.argv[2];
if (!branch) {
  console.error("Usage: npm run dev:branch -- <version>/<branch>");
  console.error("Example: npm run dev:branch -- 1.19.2/development");
  process.exit(2);
}
if (!isServedBranch || !isServedBranch(branch)) {
  console.error(`Not a serveable branch: ${JSON.stringify(branch)}`);
  console.error(
    "Expected <version>/main, <version>/development, or <version>/development-issue-<n>."
  );
  process.exit(2);
}

const base = `${normalizeBase(process.env.PAGES_BASE || "/")}${branch}/`;
console.log(`Serving ${branch} at http://localhost:5173${base}`);
const result = spawnSync(
  "npx",
  ["vite", `--base=${base}`, "--port", "5173", "--strictPort"],
  {
    stdio: "inherit",
    cwd: root,
  }
);
process.exit(result.status ?? 1);
