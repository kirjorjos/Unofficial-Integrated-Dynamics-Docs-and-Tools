import { detectInputFormat } from "lib/transformers/detectFormat";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { CodeLineToAST } from "lib/transformers/CodeLine";
import { CondensedToAST } from "lib/transformers/Condensed";
import { abstractDynamicParts } from "lib/transformers/lambdaAbstraction";
import {
  INPUT_DOC_FORMAT_TAB_IDS,
  INPUT_DOC_TABS,
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
        expect(section.heading.length).toBeGreaterThan(0);
      }
    }
  });

  it("testOverviewTabExplainsTheRequiredOptionalLegend", () => {
    const legend = inputDocTab("overview").sections.flatMap(
      (section) => section.legend ?? []
    );
    expect(legend.map((entry) => entry.emphasis).sort()).toEqual([
      "optional",
      "plain",
      "required",
    ]);
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
        (candidate) => candidate.heading === "Materializing readers"
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

  it("testWrapperExamplesAbstractTheirReadersIntoLambdaParameters", () => {
    const rootOf = (ast: TypeAST.AST): TypeAST.AST =>
      ast.type === "NetworkCards"
        ? ast.definitions[ast.definitions.length - 1]!.node
        : ast;

    const perFormat: Record<InputDocFormatTabId, TypeAST.AST> = {
      expanded: ExpandedToAST(
        "slot = Materialize(numberAdd(InventoryReader(0).inventoryCount, 2))"
      ) as TypeAST.AST,
      codeline: CodeLineToAST(
        "Materialize (numberAdd InventoryReader(0).inventoryCount 2)"
      ) as TypeAST.AST,
      condensed: CondensedToAST(
        "Materialize(numberAdd(InventoryReader(0).inventoryCount, 2))"
      ) as TypeAST.AST,
    };

    for (const tabId of INPUT_DOC_FORMAT_TAB_IDS) {
      const materialize = rootOf(perFormat[tabId]) as TypeAST.Materialize;
      expect(materialize.type).toBe("Materialize");
      expect(abstractDynamicParts(materialize.value).params).toHaveLength(1);
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
        caption: "a definition",
      })
    ).toBe("-- a definition\nx = 5");
  });
});
