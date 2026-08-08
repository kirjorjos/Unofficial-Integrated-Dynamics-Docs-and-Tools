import { getDisplayPanelText } from "pages-lib/visualTransformerLogic";
import { beforeEachVisualTransformer, makeAst, steps } from "./fixtures";

describe("getDisplayPanelText", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testRendersOperatorNameAndSignatureForOperatorNode", () => {
    const text = getDisplayPanelText({
      output: "x",
      node: makeAst.operatorNode(),
    });
    expect(text).toContain("::");
    expect(text).toContain("Number");
    expect(text).toMatch(/\->/);
  });

  it("testRendersNameAndResolvedSignatureForFullyAppliedCurry", () => {
    const text = getDisplayPanelText({
      output: "result",
      node: makeAst.arithmetic(),
    });
    expect(text).toContain("::");
    expect(text).toContain("Integer");
  });

  it("testRendersSignatureForValueNodesWithoutThrowing", () => {
    const text = getDisplayPanelText({
      output: "x",
      node: makeAst.boolVal(),
    });
    expect(typeof text).toBe("string");
  });

  it("testFallsBackGracefullyForInvalidFlips", () => {
    const output = "flipIncrement";
    const text = getDisplayPanelText({
      output,
      node: makeAst.invalidFlip(),
    });
    expect(text).toBe(output);
  });

  it("testFallsBackToStepOutputWhenNoNode", () => {
    const text = getDisplayPanelText({ output: "raw", node: null as any });
    expect(text).toBe("raw");
  });

  it("testDoesNotThrowForListNode", () => {
    const text = getDisplayPanelText({ output: "l", node: makeAst.list() });
    expect(typeof text).toBe("string");
  });

  it("testProducesDisplayTextForEveryStepOfComplexProgram", () => {
    const result = steps(makeAst.pipe2());
    for (const step of result) {
      expect(() => getDisplayPanelText(step)).not.toThrow();
    }
  });
});
