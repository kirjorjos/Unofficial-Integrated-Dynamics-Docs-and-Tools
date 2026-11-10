import {
  NBT_GUIDE_SECTIONS,
  NBT_GUIDE_TOKEN_ROWS,
  type NbtGuideBullet,
} from "lib/transformers/nbtToolsGuide";
import { substituteTemplate } from "lib/transformers/nbtTools";

const EXPECTED_SECTION_IDS = [
  "what-this-tool-does",
  "snbt-input",
  "tree-and-selection",
  "path-syntax",
  "operators",
  "logic-templates",
  "outputs-and-sharing",
];

const allExamples = NBT_GUIDE_SECTIONS.flatMap((section) => [
  ...(section.examples ?? []),
  ...(section.samples ?? []).flatMap((sample) => sample.examples),
]);

const bulletText = (bullet: NbtGuideBullet): string =>
  typeof bullet === "string"
    ? bullet
    : bullet
        .map((part) => (typeof part === "string" ? part : part.label))
        .join("");

const sectionText = (section: (typeof NBT_GUIDE_SECTIONS)[number]): string =>
  [
    section.heading,
    ...(section.paragraphs ?? []),
    ...(section.bullets ?? []).map(bulletText),
    ...(section.table
      ? [...section.table.headers, ...section.table.rows.flat()]
      : []),
    ...(section.samples ?? []).flatMap((sample) => [
      sample.code,
      sample.note ?? "",
      ...sample.examples.flatMap((example) => [
        example.code,
        example.note ?? "",
      ]),
    ]),
    ...(section.examples ?? []).flatMap((example) => [
      example.code,
      example.note ?? "",
    ]),
  ].join("\n");

describe("nbtToolsGuideContent", () => {
  it("testSectionIdsAndHeadingsAreStable", () => {
    const ids = NBT_GUIDE_SECTIONS.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const section of NBT_GUIDE_SECTIONS) {
      expect(section.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(section.heading.trim()).not.toBe("");
    }
    expect(ids).toEqual(EXPECTED_SECTION_IDS);
  });

  it("testEveryClickableExampleShipsNbt", () => {
    for (const section of NBT_GUIDE_SECTIONS) {
      for (const sample of section.samples ?? []) {
        expect(sample.code.trim()).not.toBe("");
      }
      if ((section.examples ?? []).length > 0) {
        expect(section.nbt?.trim() ?? "").not.toBe("");
      }
    }
  });

  it("testEverySampleIsStaticAndHasALoadablePath", () => {
    for (const section of NBT_GUIDE_SECTIONS) {
      for (const sample of section.samples ?? []) {
        expect(sample.code.trim()).not.toBe("");
        expect(sample.examples.length).toBeGreaterThan(0);
      }
    }
  });

  it("testEveryExampleIsALiteralThatValidates", () => {
    expect(allExamples.length).toBeGreaterThan(0);
    for (const example of allExamples) {
      expect(example.code.trim()).not.toBe("");
      expect(example.code).not.toContain("$");
      expect(substituteTemplate(example.code, {})).toEqual({
        ok: true,
        path: example.code,
      });
    }
  });

  it("testTokenRowsMatchTheToolTokens", () => {
    expect(NBT_GUIDE_TOKEN_ROWS.map((row) => row.tokens)).toEqual([
      ["$name"],
      ["> 5", ">= 5", "< 5", "<= 5"],
      ['== "Steve"'],
      [".length"],
      ["[?(…)]"],
      ["@"],
    ]);
    expect(NBT_GUIDE_TOKEN_ROWS.map((row) => row.meaning)).toEqual([
      "That selection's path, substituted in before validation: $a becomes .stats.health.",
      "Compares the value at that point to a number: 1b when it holds, else 0b.",
      "Compares the value to a string literal: 1b when equal, else 0b.",
      "Entry count of the list or compound at that point.",
      "Keeps only the children the inner expression matches.",
      "The node the surrounding filter is checking.",
    ]);
  });

  it("testGuideStaysVersionNeutral", () => {
    const text = [
      ...NBT_GUIDE_SECTIONS.map(sectionText),
      ...NBT_GUIDE_TOKEN_ROWS.flatMap((row) => [...row.tokens, row.meaning]),
    ].join("\n");
    expect(text).not.toMatch(/1\.19\.2|cyclops|newer version/i);
  });
});
