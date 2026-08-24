import {
  getDisplayPanelText,
  isTypeAssignable,
} from "pages-lib/visualTransformerLogic";
import { ExpandedToAST } from "lib/transformers/Expanded";
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

  it("testRendersNumberValueForNumberLiteral", () => {
    const text = getDisplayPanelText({
      output: "42",
      node: makeAst.numVal(),
    });
    expect(text).toBe("42");
  });

  it("testRendersDoubleValueForDoubleLiteral", () => {
    const text = getDisplayPanelText({
      output: "1.5",
      node: makeAst.doubleVal(),
    });
    expect(text).toBe("1.5");
  });

  it("testRendersBooleanValueForBooleanLiteral", () => {
    const text = getDisplayPanelText({
      output: "x",
      node: makeAst.boolVal(),
    });
    expect(text).toBe("true");
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

  it("testRendersVarByIdStepAsOperatorSignature", () => {
    const text = getDisplayPanelText({
      output: "x",
      node: makeAst.readerVarById(),
    });
    expect(text).toBe("Variable Value By ID ::\nInteger\n\u00A0-> Any");
  });

  it("testResolvesPipeSignatureOverApplyBasedCurry", () => {
    const ast = ExpandedToAST(
      `isLiteral = operatorPipe(apply(apply(operatorFlip, nbtGetString), "t"), apply(anyEquals, "l"))`
    );
    const result = steps(ast);
    const pipeStep = result[result.length - 1]!;
    const text = getDisplayPanelText(pipeStep);
    expect(text).toBe("Virtual Piped Operator ::\nNBT\n\u00A0-> Boolean");

    const curryStep = result.find((s) => s.sourceType === "Curry")!;
    const curryText = getDisplayPanelText(curryStep);
    expect(curryText).toContain("NBT");
    expect(curryText).not.toContain("::\nAny");
  });
});

describe("isTypeAssignable", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testNumberTypesSatisfyNumber", () => {
    expect(isTypeAssignable("Integer", "Number")).toBe(true);
    expect(isTypeAssignable("Long", "Number")).toBe(true);
    expect(isTypeAssignable("Double", "Number")).toBe(true);
    expect(isTypeAssignable("Number", "Number")).toBe(true);
  });

  it("testNonNumberTypesDoNotSatisfyNumber", () => {
    expect(isTypeAssignable("Boolean", "Number")).toBe(false);
    expect(isTypeAssignable("String", "Number")).toBe(false);
    expect(isTypeAssignable("Item", "Number")).toBe(false);
  });

  it("testAnyExpectedAcceptsEverything", () => {
    expect(isTypeAssignable("Boolean", "Any")).toBe(true);
    expect(isTypeAssignable("Integer", "Any")).toBe(true);
  });

  it("testNamedAcceptsConcreteNamedTypes", () => {
    expect(isTypeAssignable("Item", "Named")).toBe(true);
    expect(isTypeAssignable("Integer", "Named")).toBe(true);
    expect(isTypeAssignable("Boolean", "Named")).toBe(false);
  });

  it("testUniquelyNamedAcceptsConcreteUniquelyNamedTypes", () => {
    expect(isTypeAssignable("Block", "UniquelyNamed")).toBe(true);
    expect(isTypeAssignable("Entity", "UniquelyNamed")).toBe(true);
    expect(isTypeAssignable("String", "UniquelyNamed")).toBe(false);
  });
});
