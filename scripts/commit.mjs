import { spawnSync } from "node:child_process";

const msgArgs = process.argv.slice(2);

function run(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: "inherit" });
  if (res.error) {
    throw new Error(
      `Failed to run \`${cmd} ${args.join(" ")}\`: ${res.error.message}`
    );
  }
  if (res.signal) {
    throw new Error(
      `\`${cmd} ${args.join(" ")}\` was terminated by signal ${res.signal}`
    );
  }
  return res.status;
}

let madeStash = false;
try {
  console.log("Stashing unstaged changes");

  const stashRefBefore = spawnSync(
    "git",
    ["rev-parse", "-q", "--verify", "refs/stash"],
    {
      stdio: ["ignore", "pipe", "pipe"],
    }
  )
    .stdout.toString()
    .trim();
  const stashStatus = run("git", ["stash", "push", "-u", "-k"]);

  if (stashStatus !== 0) {
    throw new Error(
      `Failed to stash unstaged changes (exit ${stashStatus}). Nothing was changed.`
    );
  }

  const stashRefAfter = spawnSync(
    "git",
    ["rev-parse", "-q", "--verify", "refs/stash"],
    {
      stdio: ["ignore", "pipe", "pipe"],
    }
  )
    .stdout.toString()
    .trim();

  madeStash = !(stashRefAfter == "" || stashRefAfter == stashRefBefore);

  console.log("Running tests");
  const testStatus = run("npm", ["test"]);
  if (testStatus !== 0) {
    throw new Error(`Tests failed (exit ${testStatus}).`);
  }

  console.log("Restoring unstaged changes");
  if (madeStash) {
    const popStatus = run("git", ["stash", "pop"]);
    madeStash = false; // on conflict the stash is preserved; don't pop twice
    if (popStatus !== 0) {
      throw new Error(
        // Won't happen unless files get edited by another source mid-script run, but exit as cleanly as possible in that case
        "Re-applying your unstaged changes hit a conflict. Your work is safe in the stash — resolve the conflicts, then run `git stash pop`."
      );
    }
  }

  console.log("Formatting staged files");
  const formatStatus = run("npm", ["run", "format:staged"]);
  if (formatStatus !== 0) {
    throw new Error(`Formatting failed (exit ${formatStatus}).`);
  }

  const commitArgs =
    msgArgs.length > 0 ? ["commit", "-m", msgArgs.join(" ")] : ["commit"];
  process.exit(run("git", commitArgs));
} catch (err) {
  console.error(`\n${err.message}`);
  if (madeStash) {
    console.error("\nRestoring your unstaged changes");
    run("git", ["stash", "pop"]);
  }
  process.exit(1);
}
