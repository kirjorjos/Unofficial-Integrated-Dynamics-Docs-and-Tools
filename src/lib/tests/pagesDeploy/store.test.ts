import {
  decideRebuild,
  fingerprint,
  lockHashOf,
  parseBuildManifest,
  serializeBuildManifest,
  storePlan,
  viteVersionFromLock,
  type BuildManifest,
  type BuildTarget,
  type StoredFolderState,
} from "lib/pagesDeploy/store";

const BASE = "/Unofficial-Integrated-Dynamics-Docs-and-Tools/";
const SHA_A = "a".repeat(40);
const SHA_B = "b".repeat(40);

const manifest: BuildManifest = {
  branch: "1.19.2/main",
  sha: SHA_A,
  base: `${BASE}1.19.2/main/`,
  toolchain: { node: "v20.19.5", vite: "5.4.21", lockHash: "lock-a" },
};

const target: BuildTarget = {
  branch: manifest.branch,
  sha: manifest.sha,
  base: manifest.base,
  toolchain: { ...manifest.toolchain },
};

function stored(overrides: Partial<StoredFolderState> = {}): StoredFolderState {
  return {
    folderExists: true,
    indexExists: true,
    manifest,
    ...overrides,
  };
}

describe("TestPagesDeployStore", () => {
  it("testManifestRoundTrips", () => {
    const text = serializeBuildManifest(manifest);
    expect(text.endsWith("\n")).toBe(true);
    expect(parseBuildManifest(text)).toEqual(manifest);
  });

  it("testRejectsBrokenManifests", () => {
    const cases: string[] = [
      "{",
      "[]",
      JSON.stringify({ ...manifest, extra: true }),
      JSON.stringify({ ...manifest, branch: "1.19/main" }),
      JSON.stringify({ ...manifest, sha: SHA_A.slice(1) }),
      JSON.stringify({ ...manifest, base: "" }),
      JSON.stringify({ ...manifest, toolchain: {} }),
      JSON.stringify({
        ...manifest,
        toolchain: { node: "20", vite: "", lockHash: "lock" },
      }),
      JSON.stringify({ ...manifest, toolchain: { node: "20", vite: "5" } }),
    ];
    for (const text of cases) {
      expect(() => parseBuildManifest(text)).toThrow();
    }
  });

  it("testReuseMatrix", () => {
    expect(decideRebuild(stored(), target)).toEqual({
      action: "reuse",
      reason: "up-to-date",
    });

    const rebuilds: Array<[StoredFolderState, string]> = [
      [stored({ folderExists: false }), "missing-folder"],
      [stored({ manifestError: "bad" }), "invalid-manifest"],
      [stored({ manifest: undefined }), "missing-manifest"],
      [stored({ indexExists: false }), "missing-index"],
      [stored({ manifest: { ...manifest, sha: SHA_B } }), "sha-changed"],
      [
        stored({ manifest: { ...manifest, base: `${BASE}other/` } }),
        "base-changed",
      ],
      [
        stored({
          manifest: {
            ...manifest,
            toolchain: { ...manifest.toolchain, node: "v22.0.0" },
          },
        }),
        "node-changed",
      ],
      [
        stored({
          manifest: {
            ...manifest,
            toolchain: { ...manifest.toolchain, vite: "5.5.0" },
          },
        }),
        "vite-changed",
      ],
      [
        stored({
          manifest: {
            ...manifest,
            toolchain: { ...manifest.toolchain, lockHash: "lock-b" },
          },
        }),
        "lockfile-changed",
      ],
    ];
    for (const [state, reason] of rebuilds) {
      expect(decideRebuild(state, target)).toEqual({
        action: "rebuild",
        reason,
      });
    }
  });

  it("testManifestForAnotherBranchAborts", () => {
    expect(() =>
      decideRebuild(
        stored({ manifest: { ...manifest, branch: "1.19.2/development" } }),
        target
      )
    ).toThrow(/names branch/);
  });

  it("testFingerprintChangesWithEveryComponent", () => {
    const base = fingerprint(target);
    expect(fingerprint(target)).toBe(base);
    expect(fingerprint({ ...target, sha: SHA_B })).not.toBe(base);
    expect(fingerprint({ ...target, base: `${BASE}other/` })).not.toBe(base);
    expect(
      fingerprint({
        ...target,
        toolchain: { ...target.toolchain, node: "v22.0.0" },
      })
    ).not.toBe(base);
    expect(
      fingerprint({
        ...target,
        toolchain: { ...target.toolchain, vite: "5.5.0" },
      })
    ).not.toBe(base);
    expect(
      fingerprint({
        ...target,
        toolchain: { ...target.toolchain, lockHash: "lock-b" },
      })
    ).not.toBe(base);
  });

  it("testReadsViteVersionFromBothLockfileShapes", () => {
    expect(
      viteVersionFromLock(
        JSON.stringify({
          lockfileVersion: 3,
          packages: { "node_modules/vite": { version: "5.4.21" } },
        })
      )
    ).toBe("5.4.21");
    expect(
      viteVersionFromLock(
        JSON.stringify({
          lockfileVersion: 1,
          dependencies: { vite: { version: "4.0.0" } },
        })
      )
    ).toBe("4.0.0");
    expect(viteVersionFromLock("{")).toBeUndefined();
    expect(
      viteVersionFromLock(JSON.stringify({ packages: {} }))
    ).toBeUndefined();
  });

  it("testLockHash", () => {
    expect(lockHashOf(undefined)).toBe("missing");
    const hash = lockHashOf('{"lockfileVersion":3}');
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(lockHashOf('{"lockfileVersion":3}')).toBe(hash);
    expect(lockHashOf('{"lockfileVersion":2}')).not.toBe(hash);
  });

  it("testStorePlanKeepsReusedAndBuiltDropsEverythingElse", () => {
    const plan = storePlan({
      served: [
        "1.19.2/main",
        "1.19.2/development",
        "1.19.2/development/issue-1",
      ],
      pruned: ["1.19.2/development/issue-9"],
      outcomes: [
        { branch: "1.19.2/main", action: "built" },
        { branch: "1.19.2/development", action: "reused" },
        { branch: "1.19.2/development/issue-1", action: "failed" },
      ],
      existingFolders: [
        "1.19.2__main",
        "1.19.2__development",
        "1.19.2__development__issue-1",
        "1.19.2__development__issue-9",
        "orphan__folder",
      ],
    });

    expect(plan.keep).toEqual(["1.19.2__development", "1.19.2__main"]);
    expect(plan.write).toEqual(["1.19.2__main"]);
    expect(plan.drop).toEqual([
      "1.19.2__development__issue-1",
      "1.19.2__development__issue-9",
      "orphan__folder",
    ]);
    expect(plan.counts).toEqual({
      built: 1,
      reused: 1,
      pruned: 1,
      failed: 1,
    });
    expect(plan.commitMessage).toBe("deploy: build 1, reuse 1, prune 1");
  });

  it("testStorePlanRequiresAnOutcomeForEveryServedBranch", () => {
    expect(() =>
      storePlan({
        served: ["1.19.2/main"],
        pruned: [],
        outcomes: [],
        existingFolders: [],
      })
    ).toThrow(/no build outcome/);
  });
});
