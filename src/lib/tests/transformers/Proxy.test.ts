import { cardToAST } from "lib/transformers/cardAst";
import { ASTToCodeLine, CodeLineToAST } from "lib/transformers/CodeLine";
import { ASTToCompressed, CompressedToAST } from "lib/transformers/Compressed";
import { ASTToCondensed, CondensedToAST } from "lib/transformers/Condensed";
import { ExpandedToAST } from "lib/transformers/Expanded";
import { SNBTToCompoundTag } from "lib/transformers/SNBT";
import { ASTToSnbt } from "lib/transformers/snbtFormat";
import {
  buildProxyCardTooltip,
  generateVisualSteps,
  getCumulativeStepError,
  getDisplayPanelText,
  getProxyResultCard,
} from "pages-lib/visualTransformerLogic";

const decodeCard = (snbt: string) => cardToAST(SNBTToCompoundTag(snbt));

describe("Proxy", () => {
  describe("Decoding", () => {
    it("testDecodesAProxyCardWithoutAnApproximationWarning", () => {
      const result = decodeCard(
        '{_id:2,_type:"integrateddynamics:proxy",partId:7}'
      );
      expect(result.value).toEqual({ type: "Proxy", proxyId: 7 });
      expect(result.warnings).toEqual([]);
    });

    it("testAlsoReadsTheProxyIdKey", () => {
      const result = decodeCard(
        '{_id:2,_type:"integrateddynamics:proxy",proxyId:9}'
      );
      expect(result.value).toEqual({ type: "Proxy", proxyId: 9 });
    });
  });

  describe("Syntax", () => {
    it("testProxiesAnIntegerCardRatherThanReadingItAsAnId", () => {
      expect(CondensedToAST("Proxy(5)")).toMatchObject({
        type: "Proxy",
        value: { type: "Integer", value: "5" },
      });
      expect(CodeLineToAST("Proxy(5)")).toMatchObject({
        type: "Proxy",
        value: { type: "Integer", value: "5" },
      });
    });

    it("testAcceptsAnExplicitProxyIdAfterTheCard", () => {
      const expected = {
        type: "Proxy",
        proxyId: 3,
        value: { type: "Integer", value: "5" },
      };
      expect(CondensedToAST("Proxy(5, 3)")).toMatchObject(expected);
      expect(CodeLineToAST("Proxy(5, 3)")).toMatchObject(expected);
    });

    it("testRoundTripsThroughBothTextFormats", () => {
      for (const [toAST, fromAST] of [
        [CondensedToAST, ASTToCondensed],
        [CodeLineToAST, ASTToCodeLine],
      ] as const) {
        const ast = toAST("Proxy(5, 3)");
        expect(toAST(fromAST(ast))).toEqual(ast);
      }
    });

    it("testRejectsANonIntegerProxyId", () => {
      expect(() => CondensedToAST("Proxy(5, x)")).toThrow("non-negative");
      expect(() => CodeLineToAST("Proxy(5, x)")).toThrow("non-negative");
    });
  });

  describe("Compressed", () => {
    it("testRoundTripsProxyNodesThroughTheCompressedFormat", () => {
      for (const input of ["Proxy(1)", "Proxy(5, 3)", "Proxy()"]) {
        const ast = CondensedToAST(input);
        expect(CompressedToAST(ASTToCompressed(ast))).toEqual(ast);
      }
    });
  });

  describe("SNBT", () => {
    it("testWritesARealProxyCard", () => {
      const text = ASTToSnbt({
        type: "Proxy",
        value: { type: "Integer", value: "5" },
        proxyId: 3,
      });
      expect(text).toContain('_type:"integrateddynamics:proxy"');
      expect(text).toContain("partId:3");
    });
  });

  describe("Visuals", () => {
    it("testRendersAProxyStepWithTheCardItProxiesOnTop", () => {
      const steps = generateVisualSteps(CodeLineToAST("Proxy(5, 3)"), 0);
      const proxy = steps.find((step) => step.sourceType === "Proxy")!;
      expect(proxy.node.type).toBe("Proxy");
      expect(proxy.inputs[0]!.node).toMatchObject({
        type: "Integer",
        value: "5",
      });
    });

    it("testBuildsTheProxyCardTooltip", () => {
      const proxy = generateVisualSteps(CodeLineToAST("Proxy(5, 3)"), 0).find(
        (entry) => entry.sourceType === "Proxy"
      )!;
      const card = getProxyResultCard(proxy);
      expect(card.tooltip.title).toBe(`§o${proxy.output}`);
      expect(card.tooltip.lines).toEqual([
        "§eProxy ID: §r3",
        `§e§oVariable ID: §r§o${proxy.variableId}`,
        "§5§oClear or copy in a crafting grid",
      ]);
      expect(
        buildProxyCardTooltip({
          name: proxy.output,
          proxyId: 3,
          variableId: proxy.variableId,
          labeller: true,
        }).title
      ).toBe("Variable Card");
    });

    it("testRendersProxyStepsWithoutInternalErrorsAfterCompression", () => {
      for (const input of [
        "Proxy(1)",
        "test = Proxy(1)\ntest1 = identity(test)",
      ]) {
        const parsed = input.includes("\n")
          ? ExpandedToAST(input)
          : CondensedToAST(input);
        const ast = CompressedToAST(ASTToCompressed(parsed));
        const steps = generateVisualSteps(ast, 0);
        for (const step of steps) getDisplayPanelText(step);
        expect(
          getCumulativeStepError(steps, steps[steps.length - 1]!.variableId)
        ).toBeUndefined();
      }
    });

    it("testUsesOneCardIdAndOneProxyIdFromTheSharedPool", () => {
      const steps = generateVisualSteps(
        CodeLineToAST("Proxy(InventoryReader.INTEGER_COUNT, 2)"),
        0
      );
      const reader = steps.find((step) => step.sourceType === "Reader")!;
      const proxy = steps.find((step) => step.sourceType === "Proxy")!;
      expect(proxy.variableId).toBe(reader.variableId + 1);
      expect(getProxyResultCard(proxy).tooltip.lines[0]).toBe(
        "§eProxy ID: §r2"
      );
    });
  });
});
