import { build } from "esbuild";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Page } from "@playwright/test";

export const FONT_FAMILIES = [
  '"Minecraft"',
  '"Tinos"',
  '"SymbolsFallback"',
] as const;

export type FixtureFormat = "codeline" | "condensed" | "expanded";

type Parsers = {
  CodeLineToAST: (input: string) => unknown;
  CondensedToAST: (input: string) => unknown;
  ExpandedToAST: (input: string) => unknown;
  ASTToCompressed: (ast: unknown) => string;
};

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const ENTRY_SOURCE = `
import { CodeLineToAST } from "lib/transformers/CodeLine";
import { CondensedToAST } from "lib/transformers/Condensed";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { ASTToCompressed } from "lib/transformers/Compressed";
export const api = { CodeLineToAST, CondensedToAST, ExpandedToAST, ASTToCompressed };
`;

const PARSER_BY_FORMAT: Record<
  FixtureFormat,
  Exclude<keyof Parsers, "ASTToCompressed">
> = {
  codeline: "CodeLineToAST",
  condensed: "CondensedToAST",
  expanded: "ExpandedToAST",
};

let parsersPromise: Promise<Parsers> | null = null;

async function loadParsers(): Promise<Parsers> {
  if (!parsersPromise) {
    parsersPromise = (async () => {
      const entry = path.join(
        root,
        "scripts",
        `.gen-visual-codes-entry-${process.pid}.ts`
      );
      const outfile = path.join(
        root,
        "scripts",
        `.gen-visual-codes-bundle-${process.pid}.cjs`
      );
      fs.writeFileSync(entry, ENTRY_SOURCE);
      try {
        try {
          await build({
            entryPoints: [entry],
            bundle: true,
            platform: "node",
            format: "cjs",
            target: "node18",
            external: ["re2-wasm"],
            alias: { lib: path.join(root, "src/lib") },
            outfile,
            logLevel: "silent",
          });
        } catch (error) {
          parsersPromise = null;
          throw new Error(
            `Failed to bundle lib for fixture compilation: ${errorMessage(error)}`
          );
        }
        return require(outfile).api as Parsers;
      } finally {
        fs.rmSync(entry, { force: true });
        fs.rmSync(outfile, { force: true });
      }
    })();
  }
  return parsersPromise;
}

export type Fixture = { name: string; input: string; format?: FixtureFormat };

export const fixtureLabel = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1);

export async function compileCode(
  input: string,
  format: FixtureFormat = "codeline"
): Promise<string> {
  const parsers = await loadParsers();
  const parser = PARSER_BY_FORMAT[format];
  try {
    const ast = parsers[parser](input);
    return parsers.ASTToCompressed(ast);
  } catch (error) {
    throw new Error(
      `Fixture input "${input}" (${format}) failed to parse: ${errorMessage(error)}`
    );
  }
}

export async function compileFixtures<const T extends readonly Fixture[]>(
  fixtures: T
): Promise<Record<T[number]["name"], string>> {
  const entries = await Promise.all(
    fixtures.map(
      async (fixture) =>
        [
          fixture.name,
          await compileCode(fixture.input, fixture.format),
        ] as const
    )
  );
  return Object.fromEntries(entries) as Record<T[number]["name"], string>;
}

export async function compileAst(ast: unknown): Promise<string> {
  const parsers = await loadParsers();
  return parsers.ASTToCompressed(ast);
}

const waitForFontsAndNetworkIdle = async (page: Page) => {
  await page.evaluate(async (families) => {
    await Promise.all(
      families.flatMap((family) => [
        document.fonts.load(`16px ${family}`),
        document.fonts.load(`bold 16px ${family}`),
        document.fonts.load(`italic 16px ${family}`),
        document.fonts.load(`bold italic 16px ${family}`),
      ])
    );
    window.dispatchEvent(new Event("resize"));
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve(null)))
    );
  }, FONT_FAMILIES);
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForLoadState("networkidle");
};

export const openVisual = async (page: Page, code: string, varId = 0) => {
  await page.goto(`/?code=${code}&output=visual&varId=${varId}`);
  await page.locator(".logic-programmer-shot").first().waitFor();
  await waitForFontsAndNetworkIdle(page);
};

export const openReaderAspect = async (page: Page, pageId: string) => {
  await page.goto(`/#${pageId}`);
  await page.locator(".reader-aspect-doc-page").waitFor();
  await waitForFontsAndNetworkIdle(page);
};

export const openOperatorPattern = async (page: Page, operatorKey: string) => {
  await page.goto(`/#operator-${operatorKey}`);
  const patternPanel = page.locator(
    '.operator-preview-panel:has(h3:text-is("Operator Tab"))'
  );
  await patternPanel.waitFor();
  await patternPanel.locator(".logic-programmer-shot").first().waitFor();
  await waitForFontsAndNetworkIdle(page);
};
