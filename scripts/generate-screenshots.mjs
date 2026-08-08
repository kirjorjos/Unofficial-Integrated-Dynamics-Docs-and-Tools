import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, rmSync } from "node:fs";

const specs = readdirSync("ui-tests")
  .filter((file) => file.endsWith(".test.ts"))
  .filter((file) =>
    readFileSync(`ui-tests/${file}`, "utf8").includes("toHaveScreenshot")
  )
  .map((file) => `ui-tests/${file}`);

console.log(
  `Regenerating local snapshots into .local-snapshots/ (${specs.length} specs):`
);
for (const spec of specs) {
  console.log(`  - ${spec}`);
}

rmSync(".local-snapshots", { recursive: true, force: true });

const result = spawnSync(
  "npx",
  ["playwright", "test", ...specs, "--update-snapshots"],
  { stdio: "inherit", env: { ...process.env, LOCAL_SNAPSHOTS: "1" } }
);

if (result.status === 0) {
  console.log(`
    Sandbox regenerated. To inspect rendering deltas against it, run:
      LOCAL_SNAPSHOTS=1 npx playwright test
    then open the HTML report: npm run test:report
  `);
}

process.exit(result.status ?? 1);
