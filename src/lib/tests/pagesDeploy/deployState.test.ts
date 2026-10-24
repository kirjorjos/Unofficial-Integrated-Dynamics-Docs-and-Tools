import {
  isFullSha,
  parseDeployState,
  readDeployState,
  serializeDeployState,
  stateUrlFor,
  type FetchLike,
} from "lib/pagesDeploy/deployState";

const SHA_A = "a".repeat(40);
const SHA_B = "b".repeat(40);
const URL = "https://example.test/base/current-versions.json";

function response(status: number, body: string) {
  return { status, text: async () => body };
}

function sequenceFetch(responses: Array<ReturnType<typeof response> | Error>): {
  fetchImpl: FetchLike;
  calls: () => number;
} {
  let calls = 0;
  return {
    fetchImpl: async () => {
      const next = responses[calls];
      calls += 1;
      if (next === undefined) throw new Error("fetch called too often");
      if (next instanceof Error) throw next;
      return next;
    },
    calls: () => calls,
  };
}

describe("TestPagesDeployDeployState", () => {
  it("testBuildsStateUrlForProjectAndRootBases", () => {
    expect(
      stateUrlFor(
        "https://kirjorjos.github.io",
        "/Unofficial-Integrated-Dynamics-Docs-and-Tools/"
      )
    ).toBe(
      "https://kirjorjos.github.io/Unofficial-Integrated-Dynamics-Docs-and-Tools/current-versions.json"
    );
    expect(stateUrlFor("https://example.com/", "/")).toBe(
      "https://example.com/current-versions.json"
    );
    expect(stateUrlFor("https://example.com", "/1.19.2/")).toBe(
      "https://example.com/1.19.2/current-versions.json"
    );
    expect(() => stateUrlFor("", "/")).toThrow(/site URL/);
  });

  it("testRoundTripsSortedWithTrailingNewline", () => {
    const state = {
      branches: {
        "1.19.2/main": SHA_A,
        "1.19.2/development": SHA_B,
      },
    };
    const text = serializeDeployState(state);
    expect(text.endsWith("\n")).toBe(true);
    expect(Object.keys(JSON.parse(text).branches)).toEqual([
      "1.19.2/development",
      "1.19.2/main",
    ]);
    expect(parseDeployState(text)).toEqual(state);
  });

  it("testRejectsInvalidState", () => {
    expect(isFullSha(SHA_A)).toBe(true);
    for (const sha of [
      "a".repeat(39),
      "A".repeat(40),
      "0x" + "a".repeat(38),
      SHA_A + "0",
    ]) {
      expect(isFullSha(sha)).toBe(false);
    }

    const invalid: string[] = [
      "{",
      "[]",
      "null",
      JSON.stringify({ version: 1 }),
      JSON.stringify({ branches: {}, extra: true }),
      JSON.stringify({ branches: { "1.19.2/main": SHA_A }, extra: 1 }),
      JSON.stringify({ branches: { "1.19/main": SHA_A } }),
      JSON.stringify({ branches: { "1.19.2/main": SHA_A.slice(1) } }),
      JSON.stringify({ branches: { "1.19.2/main": 42 } }),
      JSON.stringify({ branches: [] }),
    ];
    for (const text of invalid) {
      expect(() => parseDeployState(text)).toThrow();
    }

    expect(parseDeployState(JSON.stringify({ branches: {} }))).toEqual({
      branches: {},
    });
  });

  it("testBootstrapAccepts404OnlyForTheSinglePrimary", async () => {
    const bootstrap = sequenceFetch([response(404, "")]);
    await expect(
      readDeployState(URL, {
        bootstrapAllowed: true,
        fetchImpl: bootstrap.fetchImpl,
        sleep: async () => undefined,
      })
    ).resolves.toEqual({ branches: {} });
    expect(bootstrap.calls()).toBe(1);

    const abort = sequenceFetch([response(404, "")]);
    await expect(
      readDeployState(URL, {
        bootstrapAllowed: false,
        fetchImpl: abort.fetchImpl,
        sleep: async () => undefined,
      })
    ).rejects.toThrow(/refusing to deploy/);
    expect(abort.calls()).toBe(1);
  });

  it("testRetries5xxAndTransportFailures", async () => {
    const retried = sequenceFetch([
      response(503, "nope"),
      new Error("network down"),
      response(200, JSON.stringify({ branches: { "1.19.2/main": SHA_A } })),
    ]);
    const sleeps: number[] = [];
    await expect(
      readDeployState(URL, {
        bootstrapAllowed: false,
        fetchImpl: retried.fetchImpl,
        sleep: async (ms) => {
          sleeps.push(ms);
        },
      })
    ).resolves.toEqual({ branches: { "1.19.2/main": SHA_A } });
    expect(retried.calls()).toBe(3);
    expect(sleeps).toEqual([500, 1000]);

    const rateLimited = sequenceFetch([
      response(429, ""),
      response(200, JSON.stringify({ branches: { "1.19.2/main": SHA_A } })),
    ]);
    await expect(
      readDeployState(URL, {
        bootstrapAllowed: false,
        fetchImpl: rateLimited.fetchImpl,
        sleep: async () => undefined,
      })
    ).resolves.toEqual({ branches: { "1.19.2/main": SHA_A } });
    expect(rateLimited.calls()).toBe(2);

    const exhausted = sequenceFetch([
      response(500, ""),
      response(500, ""),
      response(500, ""),
    ]);
    await expect(
      readDeployState(URL, {
        bootstrapAllowed: false,
        fetchImpl: exhausted.fetchImpl,
        sleep: async () => undefined,
      })
    ).rejects.toThrow(/HTTP 500/);
    expect(exhausted.calls()).toBe(3);
  });

  it("testAbortsWithoutRetryingPermanentFailures", async () => {
    const forbidden = sequenceFetch([response(403, "")]);
    await expect(
      readDeployState(URL, {
        bootstrapAllowed: false,
        fetchImpl: forbidden.fetchImpl,
        sleep: async () => undefined,
      })
    ).rejects.toThrow(/HTTP 403/);
    expect(forbidden.calls()).toBe(1);

    const invalid = sequenceFetch([response(200, "{bad json")]);
    await expect(
      readDeployState(URL, {
        bootstrapAllowed: false,
        fetchImpl: invalid.fetchImpl,
        sleep: async () => undefined,
      })
    ).rejects.toThrow(/not valid JSON/);
    expect(invalid.calls()).toBe(1);
  });
});
