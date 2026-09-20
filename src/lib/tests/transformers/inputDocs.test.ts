import { detectInputFormat } from "lib/transformers/detectFormat";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { CodeLineToAST } from "lib/transformers/CodeLine";
import { CondensedToAST } from "lib/transformers/Condensed";
import {
  INPUT_DOC_FORMAT_TAB_IDS,
  INPUT_DOC_TABS,
  inputDocExampleInput,
  inputDocFormatExamples,
  inputDocTab,
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
