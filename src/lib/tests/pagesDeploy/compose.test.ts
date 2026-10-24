import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { branchUrl } from "lib/pagesDeploy/branchPattern";
import {
  composeSite,
  type ComposeEntry,
  type ComposeOptions,
} from "lib/pagesDeploy/compose";
import { serializeBuildManifest } from "lib/pagesDeploy/store";

const BASE = "/Unofficial-Integrated-Dynamics-Docs-and-Tools/";
const PRIMARY = "1.19.2/main";

const shaOf = (branch: string): string =>
  createHash("sha256").update(branch).digest("hex").slice(0, 40);

interface EntryOverrides {
  sha?: string;
  base?: string;
  manifest?: boolean;
}

function makeEntry(
  root: string,
  branch: string,
  files: Record<string, string>,
  overrides: EntryOverrides = {}
): ComposeEntry {
  const slug = branch.replace(/\//g, "__");
  const dir = path.join(root, "builds", slug);
  mkdirSync(dir, { recursive: true });
  for (const [rel, content] of Object.entries(files)) {
    const file = path.join(dir, ...rel.split("/"));
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, content);
  }
  const sha = overrides.sha ?? shaOf(branch);
  if (overrides.manifest !== false) {
    writeFileSync(
      path.join(dir, "build.json"),
      serializeBuildManifest({
        branch,
        sha,
        base: overrides.base ?? branchUrl(BASE, branch),
        toolchain: { node: "v20.19.5", vite: "5.4.21", lockHash: "lock" },
      })
    );
  }
  return { branch, dir, sha };
}

function tree(dir: string): Record<string, string> {
  const files: Record<string, string> = {};
  const walk = (current: string, relBase: string): void => {
    for (const name of readdirSync(current).sort()) {
      const abs = path.join(current, name);
      const rel = relBase === "" ? name : `${relBase}/${name}`;
      if (statSync(abs).isDirectory()) {
        walk(abs, rel);
      } else {
        files[rel] = readFileSync(abs, "utf8");
      }
    }
  };
  walk(dir, "");
  return files;
}

describe("TestPagesDeployCompose", () => {
  let tmp: string;
  let store: string;
  let out: string;

  beforeEach(() => {
    tmp = mkdtempSync(path.join(os.tmpdir(), "pages-compose-"));
    store = path.join(tmp, "builds");
    out = path.join(tmp, "site");
    mkdirSync(store, { recursive: true });
  });

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true });
  });

  function compose(
    entries: ComposeEntry[],
    overrides: Partial<ComposeOptions> = {}
  ) {
    return composeSite({
      outDir: out,
      entries,
      primary: PRIMARY,
      servedBranches: [PRIMARY],
      base: BASE,
      ...overrides,
    });
  }

  it("testComposesBranchesRedirectsAndState", () => {
    const main = makeEntry(store, PRIMARY, {
      "index.html": "<main>",
      "assets/index.js": "main-js",
    });
    const dev = makeEntry(store, "1.19.2/development", {
      "index.html": "<dev>",
      "assets/app.js": "dev-js",
    });

    const result = compose([main, dev], {
      servedBranches: [PRIMARY, "1.19.2/development"],
    });

    const root = readFileSync(path.join(out, "index.html"), "utf8");
    expect(root).toContain(
      `location.replace("${BASE}1.19.2/main/" + location.search + location.hash)`
    );
    expect(root).toContain(`rel="canonical" href="${BASE}1.19.2/main/"`);

    const version = readFileSync(path.join(out, "1.19.2/index.html"), "utf8");
    expect(version).toContain(`"${BASE}1.19.2/main/"`);
    expect(version).toContain("Continue to 1.19.2/main");

    expect(readFileSync(path.join(out, "1.19.2/main/index.html"), "utf8")).toBe(
      "<main>"
    );
    expect(
      readFileSync(path.join(out, "1.19.2/development/assets/app.js"), "utf8")
    ).toBe("dev-js");
    expect(existsSync(path.join(out, "1.19.2/main/build.json"))).toBe(false);

    const state = JSON.parse(
      readFileSync(path.join(out, "current-versions.json"), "utf8")
    );
    expect(state).toEqual({
      branches: {
        "1.19.2/development": shaOf("1.19.2/development"),
        "1.19.2/main": shaOf(PRIMARY),
      },
    });
    expect(result.redirects).toEqual(["1.19.2/index.html"]);
    expect(result.state.branches).toEqual(state.branches);
    expect(result.branches.map((entry) => entry.branch)).toEqual([
      "1.19.2/development",
      PRIMARY,
    ]);
  });

  it("testNestedBranchesCoexistEvenWhenPassedChildFirst", () => {
    const child = makeEntry(store, "1.19.2/development/issue-77", {
      "index.html": "<child>",
    });
    const parent = makeEntry(store, "1.19.2/development", {
      "index.html": "<parent>",
      "assets/parent.js": "parent-js",
    });

    compose([child, parent], {
      servedBranches: [PRIMARY, "1.19.2/development", child.branch],
    });

    expect(
      readFileSync(path.join(out, "1.19.2/development/index.html"), "utf8")
    ).toBe("<parent>");
    expect(
      readFileSync(
        path.join(out, "1.19.2/development/assets/parent.js"),
        "utf8"
      )
    ).toBe("parent-js");
    expect(
      readFileSync(
        path.join(out, "1.19.2/development/issue-77/index.html"),
        "utf8"
      )
    ).toBe("<child>");
  });

  it("testVersionRedirectOnlyForVersionsWithAServedMain", () => {
    const dev = makeEntry(store, "26.1.2/development", {
      "index.html": "<dev>",
    });
    compose([dev], {
      servedBranches: [PRIMARY, "26.1.2/development"],
    });
    expect(existsSync(path.join(out, "26.1.2/index.html"))).toBe(false);
    expect(existsSync(path.join(out, "1.19.2/index.html"))).toBe(true);
  });

  it("testOmitsBranchesWithNoStoredFolder", () => {
    const main = makeEntry(store, PRIMARY, { "index.html": "<main>" });
    const result = compose([main], {
      servedBranches: [PRIMARY, "1.19.2/development"],
    });
    expect(result.state.branches).toEqual({
      [PRIMARY]: shaOf(PRIMARY),
    });
    expect(existsSync(path.join(out, "1.19.2/development"))).toBe(false);
  });

  it("testRejectsManifestMismatchesAndMissingIndex", () => {
    const wrongShaBranch = "2.0.0/main";
    const wrongSha = makeEntry(store, wrongShaBranch, { "index.html": "x" });
    wrongSha.sha = "b".repeat(40);
    expect(() =>
      compose([wrongSha], {
        servedBranches: [PRIMARY, wrongShaBranch],
      })
    ).toThrow(/does not match the plan/);

    const wrongBaseBranch = "3.0.0/main";
    expect(() =>
      compose(
        [
          makeEntry(
            store,
            wrongBaseBranch,
            { "index.html": "x" },
            { base: `${BASE}other/` }
          ),
        ],
        { servedBranches: [PRIMARY, wrongBaseBranch] }
      )
    ).toThrow(/base .* does not match/);

    const noIndexBranch = "4.0.0/main";
    expect(() =>
      compose([makeEntry(store, noIndexBranch, { "a.txt": "x" })], {
        servedBranches: [PRIMARY, noIndexBranch],
      })
    ).toThrow(/no index.html/);

    const wrongBranch = makeEntry(store, PRIMARY, { "index.html": "x" });
    writeFileSync(
      path.join(wrongBranch.dir, "build.json"),
      serializeBuildManifest({
        branch: "1.19.2/development",
        sha: wrongBranch.sha,
        base: branchUrl(BASE, "1.19.2/development"),
        toolchain: { node: "v20.19.5", vite: "5.4.21", lockHash: "lock" },
      })
    );
    expect(() => compose([wrongBranch])).toThrow(/names branch/);

    const wrongSlug = makeEntry(store, PRIMARY, { "index.html": "x" });
    const renamed = path.join(store, "some-other-folder");
    rmSync(wrongSlug.dir, { recursive: true, force: true });
    mkdirSync(renamed, { recursive: true });
    writeFileSync(path.join(renamed, "index.html"), "x");
    writeFileSync(
      path.join(renamed, "build.json"),
      serializeBuildManifest({
        branch: PRIMARY,
        sha: shaOf(PRIMARY),
        base: branchUrl(BASE, PRIMARY),
        toolchain: { node: "v20.19.5", vite: "5.4.21", lockHash: "lock" },
      })
    );
    expect(() =>
      compose([{ branch: PRIMARY, dir: renamed, sha: shaOf(PRIMARY) }])
    ).toThrow(/does not match its slug/);
  });

  it("testRejectsDuplicateAndUnservedEntries", () => {
    const main = makeEntry(store, PRIMARY, { "index.html": "x" });
    expect(() => compose([main, main])).toThrow(/two entries/);
    expect(() =>
      compose([main], {
        servedBranches: ["1.19.2/development"],
        primary: "1.19.2/development",
      })
    ).toThrow(/not a served branch/);
    expect(() =>
      compose([main], { servedBranches: [PRIMARY, PRIMARY] })
    ).toThrow(/listed twice/);
    expect(() => compose([main], { primary: "1.19.2/development" })).toThrow(
      /not in the served list/
    );
  });

  it("testRejectsSymlinksInStoredBuilds", () => {
    const main = makeEntry(store, PRIMARY, { "index.html": "x" });
    symlinkSync("index.html", path.join(main.dir, "linked.html"));
    expect(() => compose([main])).toThrow(/symlink/);
  });

  it("testDetectsAFileDirectoryCollisionBetweenNestedBranches", () => {
    const parent = makeEntry(store, "1.19.2/development", {
      "index.html": "parent",
      "issue-77": "this is a file, not a directory",
    });
    const child = makeEntry(store, "1.19.2/development/issue-77", {
      "index.html": "child",
    });
    expect(() =>
      compose([parent, child], {
        servedBranches: [PRIMARY, parent.branch, child.branch],
      })
    ).toThrow(/collisions/);
    expect(existsSync(path.join(out, "1.19.2/development/issue-77"))).toBe(
      false
    );
  });

  it("testIsDeterministicAcrossRunsAndOutputDirectories", () => {
    const main = makeEntry(store, PRIMARY, {
      "index.html": "<main>",
      "assets/a.js": "a",
    });
    const dev = makeEntry(store, "1.19.2/development", {
      "index.html": "<dev>",
    });
    const entries = [main, dev];
    const servedBranches = [PRIMARY, dev.branch];

    compose(entries, { servedBranches });
    const first = tree(out);

    out = path.join(tmp, "site-2");
    compose(entries, { servedBranches });
    const second = tree(out);

    expect(second).toEqual(first);
  });
});
