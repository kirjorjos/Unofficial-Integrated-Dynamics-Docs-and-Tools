/**
 * Decodes the transformers-page URL embedded in an internal-bug issue (the
 * `?code=` compressed state) using the CURRENT transformer code, and renders
 * the program's expanded output up to the failing step with default settings.
 * Runs on issue-open so the exact input survives even if the compressed
 * format changes later. Writes the decoded result to RESULT_FILE as JSON; the
 * workflow's github-script step posts the comment and labels.
 *
 * Result JSON:
 *   { found: false }                         — no repro URL in the body
 *   { found: true, failed: false, input, expanded, step } — decoded input
 *   { found: true, failed: true, input: null }            — decode failed
 *
 * Env:
 *   ISSUE_BODY  — the issue body markdown
 *   RESULT_FILE — path to write the result JSON to (defaults to tmpdir)
 */
import { build } from "esbuild";
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

const ENTRY_SOURCE = `
import { decodeTransformerUrlCode } from "lib/transformers/decodeUrlState";
import { ASTToCondensed } from "lib/transformers/Condensed";
import { ASTToExpandedWithSignatureOptions } from "lib/transformers/Expanded";
import { generateVisualSteps } from "pages-lib/visualTransformerLogic";

const DEFAULT_SIG_OPTS = {
  depth: null,
  labels: false,
  arrow: "→",
  hideOperatorWrappers: false,
  resolveAnys: false,
};
const DEFAULT_DISPLAY_OPTS = {
  signatureLayout: "own-line",
  inlinePlacement: "after",
  expandedRefForm: "varId",
  variableWrapper: false,
  lambdaParamSugar: false,
  comments: false,
  joinStatements: ";",
  refStyle: "varId",
  resolve: false,
};

const renderExpandedUpToStep = (ast, stepNumber) => {
  const render = (target) =>
    ASTToExpandedWithSignatureOptions(
      target,
      "Condensed",
      DEFAULT_SIG_OPTS,
      true,
      undefined,
      DEFAULT_DISPLAY_OPTS
    );
  if (
    ast.type !== "NetworkCards" ||
    !Number.isFinite(stepNumber) ||
    stepNumber < 1
  ) {
    return render(ast);
  }
  let prefixAst = ast;
  for (let i = 0; i < ast.definitions.length; i++) {
    const candidate = {
      type: "NetworkCards",
      definitions: ast.definitions.slice(0, i + 1),
    };
    if (generateVisualSteps(candidate, 0).length >= stepNumber) {
      prefixAst = candidate;
      break;
    }
  }
  return render(prefixAst);
};

export const api = {
  decode(code, outputFormat, stepNumber) {
    const { ast, input } = decodeTransformerUrlCode(code, outputFormat, {
      initialVariableId: 0,
    });
    return {
      input: input ?? ASTToCondensed(ast, true, 0),
      fallback: ASTToCondensed(ast, true, 0),
      expanded: renderExpandedUpToStep(ast, stepNumber),
    };
  },
};
`;

const findReproUrl = (body) => {
  const urlPattern = /https?:\/\/[^\s<>"')]+/g;
  for (const match of body.matchAll(urlPattern)) {
    try {
      const url = new URL(match[0]);
      const code = url.searchParams.get("code");
      if (code) {
        return {
          code,
          output: url.searchParams.get("output") ?? "visual",
        };
      }
    } catch {}
  }
  return null;
};

/** Reads the "### Step (automated)" section of the pseudo-template body. */
const findStepNumber = (body) => {
  const match = body.match(/### Step \(automated\)\s*\n+\s*(\d+)/);
  if (!match) return undefined;
  const step = Number(match[1]);
  return Number.isFinite(step) && step >= 1 ? step : undefined;
};

async function main() {
  const body = process.env.ISSUE_BODY ?? "";
  const resultFile =
    process.env.RESULT_FILE ??
    path.join(os.tmpdir(), "comment-repro-result.json");

  const repro = findReproUrl(body);
  if (!repro) {
    fs.writeFileSync(resultFile, JSON.stringify({ found: false }));
    console.log(
      "Issue body has no transformers URL with a code= param — skipping."
    );
    process.exit(0);
  }
  const step = findStepNumber(body);

  const entry = path.join(
    root,
    "scripts",
    `.comment-repro-entry-${process.pid}.ts`
  );
  const outfile = path.join(
    root,
    "scripts",
    `.comment-repro-bundle-${process.pid}.cjs`
  );
  fs.writeFileSync(entry, ENTRY_SOURCE);

  let decodedResult = null;
  let decodeFailed = false;
  try {
    await build({
      entryPoints: [entry],
      bundle: true,
      platform: "node",
      format: "cjs",
      target: "node18",
      external: ["re2-wasm"],
      alias: {
        lib: path.join(root, "src/lib"),
        "pages-lib": path.join(root, "src/pages/lib"),
      },
      outfile,
      logLevel: "silent",
    });
    const { api } = require(outfile);
    try {
      decodedResult = api.decode(repro.code, repro.output, step);
    } catch (error) {
      decodeFailed = true;
      console.error(
        "[comment-repro-input] Failed to decode compressed code:",
        error
      );
    }
  } finally {
    fs.rmSync(entry, { force: true });
    fs.rmSync(outfile, { force: true });
  }

  fs.writeFileSync(
    resultFile,
    JSON.stringify({
      found: true,
      failed: decodeFailed,
      step: step ?? null,
      input: decodedResult?.input ?? null,
      expanded: decodedResult?.expanded ?? null,
    })
  );
  console.log(`Wrote decoded repro result to ${resultFile}.`);
}

main().catch((error) => {
  console.error("[comment-repro-input]", error);
  process.exit(1);
});
