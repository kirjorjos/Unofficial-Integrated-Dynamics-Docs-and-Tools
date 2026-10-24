import { detectInputFormat } from "lib/transformers/detectFormat";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { CodeLineToAST } from "lib/transformers/CodeLine";
import { CondensedToAST } from "lib/transformers/Condensed";
import { abstractDynamicParts } from "lib/transformers/lambdaAbstraction";
import { inputToGiveCommands } from "lib/transformers/giveCommands";
import { snbtInputToAST } from "lib/transformers/snbtFormat";
import {
  INPUT_DOC_FORMAT_TAB_IDS,
  INPUT_DOC_TABS,
  docText,
  inputDocExampleInput,
  inputDocFormatExamples,
  inputDocTab,
  type InputDocFormatTabId,
} from "lib/transformers/inputDocs";

const PARSER = {
  expanded: ExpandedToAST,
  codeline: CodeLineToAST,
  condensed: CondensedToAST,
} as const;

describe("TestInputDocs", () => {
  it("testExposesOneTabPerDocumentedInputFormWithOverviewFirst", () => {
    expect(INPUT_DOC_TABS.map((tab) => tab.id)).toEqual([
      "overview",
      "expanded",
      "codeline",
      "condensed",
      "snbt",
      "visual",
    ]);
    expect(INPUT_DOC_FORMAT_TAB_IDS).toEqual([
      "expanded",
      "codeline",
      "condensed",
    ]);
  });

  it("testGivesEveryTabALabelAndAtLeastOneSection", () => {
    for (const tab of INPUT_DOC_TABS) {
      expect(tab.label.length).toBeGreaterThan(0);
      expect(tab.sections.length).toBeGreaterThan(0);
      for (const section of tab.sections) {
        expect(docText(section.heading).length).toBeGreaterThan(0);
      }
    }
  });

  it("testNamesSettingsAsCodeSpansInTheOverviewComments", () => {
    const summary = inputDocTab("overview").sections.find(
      (section) => docText(section.heading) === "Comments"
    )?.summary;
    const code = summary?.filter((span) => span.code).map((span) => span.text);
    expect(code).toEqual([
      "Preserve comments",
      "Expanded",
      "Code Line",
      "Condensed",
    ]);
  });

  it("testSnbtGiveOutputDocumentsThePasteRules", () => {
    const section = inputDocTab("snbt").sections.find(
      (candidate) => docText(candidate.heading) === "The /give output"
    );
    expect(section).toBeDefined();

    const bullets = (section!.bullets ?? []).map(docText);
    expect(
      bullets.some((bullet) => bullet.startsWith("Duplicate conflicts"))
    ).toBe(true);
    expect(bullets.some((bullet) => bullet.startsWith("Missing parts"))).toBe(
      true
    );
    expect(bullets.some((bullet) => bullet.includes("Interface parts"))).toBe(
      true
    );

    const shapes = (section!.syntax ?? []).map((line) => docText(line.spans));
    expect(shapes).toEqual([
      "/give @p integrateddynamics:variable{_id, _type, …}",
      "/give @p integrateddynamics:variablestore{inventory:[…]}",
      "/give @p integrateddynamics:part_display_panel{id, aspectProperties, enabled, updateInterval, inventory:[…]}",
      "/give @p integrateddynamics:part_<part>_reader{id, aspectProperties:[…], inventory:[…]}",
      "/give @p integrateddynamics:part_<part>_writer{id, inventory:[…]}",
    ]);
    expect((section!.examples ?? []).length).toBe(1);
  });

  it("testOverviewTabExplainsTheRequiredOptionalLegend", () => {
    const legend = inputDocTab("overview").sections.flatMap(
      (section) => section.legend ?? []
    );
    expect(
      legend.map((entry) => ({
        emphasis: entry.emphasis,
        color: entry.color ?? null,
      }))
    ).toEqual([
      { emphasis: "required", color: null },
      { emphasis: "optional", color: null },
      { emphasis: "plain", color: null },
      { emphasis: "plain", color: "#15c40b" },
    ]);
    expect(docText(legend[3]!.label)).toBe("shortened");
  });

  it.each(
    inputDocFormatExamples().flatMap(({ tabId, examples }) =>
      examples.map(
        (example) =>
          [tabId, example.text, inputDocExampleInput(example)] as const
      )
    )
  )("testConcrete%sExampleDetectsAndParses%j", (tabId, text, loadedInput) => {
    expect(detectInputFormat(text)).toBe(tabId);
    expect(() => PARSER[tabId](text)).not.toThrow();
    expect(PARSER[tabId](text)).toBeTruthy();
    expect(detectInputFormat(loadedInput)).toBe(tabId);
    expect(() => PARSER[tabId](loadedInput)).not.toThrow();
    expect(PARSER[tabId](loadedInput)).toBeTruthy();
  });

  it("testEveryFormatTabDocumentsTheWrapperNodesWithRunnableExamples", () => {
    const wrappers = ["Materialize", "Dynamic", "Static"];

    for (const tabId of INPUT_DOC_FORMAT_TAB_IDS) {
      const section = inputDocTab(tabId).sections.find(
        (candidate) => docText(candidate.heading) === "Materializing readers"
      );
      expect(section).toBeDefined();

      const documented = JSON.stringify(section);
      for (const wrapper of wrappers) {
        expect(documented).toContain(wrapper);
      }

      const examples = (section!.examples ?? []).filter(
        (example) => example.kind === "concrete"
      );
      expect(examples.length).toBeGreaterThan(0);
      expect(section!.examples).toHaveLength(examples.length);

      for (const example of examples) {
        expect(example.text).toContain("Materialize");
      }
    }
  });

  it("testWrapperExamplesKeepReadersStaticUnlessMarkedDynamic", () => {
    const rootOf = (ast: TypeAST.AST): TypeAST.AST =>
      ast.type === "NetworkCards"
        ? ast.definitions[ast.definitions.length - 1]!.node
        : ast;

    const sources: Record<InputDocFormatTabId, [string, string]> = {
      expanded: [
        "slot = Materialize(numberAdd(InventoryReader(0).inventoryCount, 2))",
        "slot = Materialize(numberAdd(Dynamic(InventoryReader(0).inventoryCount), 2))",
      ],
      codeline: [
        "Materialize (numberAdd InventoryReader(0).inventoryCount 2)",
        "Materialize (numberAdd (Dynamic(InventoryReader(0).inventoryCount)) 2)",
      ],
      condensed: [
        "Materialize(numberAdd(InventoryReader(0).inventoryCount, 2))",
        "Materialize(numberAdd(Dynamic(InventoryReader(0).inventoryCount), 2))",
      ],
    };
    const parsers = {
      expanded: (source: string) => ExpandedToAST(source) as TypeAST.AST,
      codeline: (source: string) => CodeLineToAST(source) as TypeAST.AST,
      condensed: (source: string) => CondensedToAST(source) as TypeAST.AST,
    };

    for (const tabId of INPUT_DOC_FORMAT_TAB_IDS) {
      for (const [source, expectedParams] of [
        [sources[tabId][0], 0],
        [sources[tabId][1], 1],
      ] as const) {
        const materialize = rootOf(
          parsers[tabId](source)
        ) as TypeAST.Materialize;
        expect(materialize.type).toBe("Materialize");
        expect(abstractDynamicParts(materialize.value).params).toHaveLength(
          expectedParams
        );
      }
    }
  });

  it("testEverySnbtExampleIsDetectedAndParses", () => {
    const examples = inputDocTab("snbt").sections.flatMap(
      (section) =>
        section.examples?.filter((example) => example.kind === "concrete") ?? []
    );
    expect(examples.length).toBeGreaterThan(0);

    for (const example of examples) {
      expect(detectInputFormat(example.text)).toBe("snbt");
      const parsed = snbtInputToAST(example.text, { missingParts: "warn" });
      expect(parsed).toBeTruthy();
    }
  });

  it("testSnbtExamplesProduceGiveCommands", () => {
    const examples = inputDocTab("snbt").sections.flatMap(
      (section) =>
        section.examples?.filter((example) => example.kind === "concrete") ?? []
    );
    for (const example of examples) {
      const out = inputToGiveCommands(example.text, { missingParts: "warn" });
      expect(out.lines.length).toBeGreaterThan(0);
      expect(out.lines.every((line) => line.startsWith("/give @p "))).toBe(
        true
      );
    }
  });

  it("testLoadedExampleAddsItsCaptionAsALeadingComment", () => {
    expect(inputDocExampleInput({ kind: "concrete", text: "x = 5" })).toBe(
      "x = 5"
    );
    expect(
      inputDocExampleInput({
        kind: "concrete",
        text: "x = 5",
        caption: [{ text: "a definition" }],
      })
    ).toBe("-- a definition\nx = 5");
  });
});
