import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const entry = path.join(root, "src/lib/pagesDeploy/cli.ts");

const FOOTER = `
Promise.resolve(module.exports.main(process.argv.slice(2))).catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
`;

async function bundle(outfile) {
  await build({
    entryPoints: [entry],
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node20",
    outfile,
    logLevel: "warning",
    footer: { js: FOOTER },
  });
}

const args = process.argv.slice(2);
const bundleFlag = args.indexOf("--bundle");

if (bundleFlag !== -1) {
  const outfile = args[bundleFlag + 1];
  if (!outfile) {
    console.error("--bundle needs an output path");
    process.exit(2);
  }
  await bundle(path.resolve(outfile));
  console.log(`Wrote Pages deploy bundle to ${path.resolve(outfile)}`);
  process.exit(0);
}

const tmp = path.join(os.tmpdir(), `pages-deploy-${process.pid}.cjs`);
await bundle(tmp);
const result = spawnSync(process.execPath, [tmp, ...args], {
  stdio: "inherit",
  cwd: root,
});
fs.rmSync(tmp, { force: true });
process.exit(result.status ?? 1);
