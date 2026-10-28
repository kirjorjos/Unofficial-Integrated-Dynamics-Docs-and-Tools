import { astToGiveCommands } from "lib/transformers/astGiveCommands";
import { ASTToCondensed, CondensedToAST } from "lib/transformers/Condensed";
import {
  ASTToExpandedWithSignatureOptions,
  ExpandedToAST,
} from "lib/transformers/Expanded";
import { astContentKey } from "lib/transformers/NetworkCards";

describe("TestVariableRefs", () => {
  it("parses @5 as an id and @foo as a label", () => {
    expect(CondensedToAST("@5", undefined, 0, true)).toEqual({
      type: "Variable",
      id: "5",
    });
    expect(CondensedToAST("@foo", undefined, 0, true)).toEqual({
      type: "Variable",
      label: "foo",
    });
  });

  it("parses Variable(...) into the same node", () => {
    expect(CondensedToAST('Variable("foo")', undefined, 0, true)).toEqual({
      type: "Variable",
      label: "foo",
    });
    expect(CondensedToAST('Variable("0")', undefined, 0, true)).toEqual({
      type: "Variable",
      id: "0",
    });
  });

  it("prints @id and @label in native formats", () => {
    expect(ASTToCondensed({ type: "Variable", id: "5" })).toBe("@5");
    expect(ASTToCondensed({ type: "Variable", label: "foo" })).toBe("@foo");
    expect(ASTToCondensed({ type: "Variable", label: "my var" })).toBe(
      'Variable("my var")'
    );
  });

  it("prints the label when both fields are present", () => {
    expect(ASTToCondensed({ type: "Variable", id: "5", label: "foo" })).toBe(
      "@foo"
    );
  });

  it("keeps both fields through a compressed-style round trip", () => {
    const ast = ASTToCondensed({
      type: "Variable",
      id: "5",
      label: "foo",
    });
    expect(CondensedToAST(ast, undefined, 0, true)).toEqual({
      type: "Variable",
      label: "foo",
    });
  });

  it("includes id, label and valueType in the content key", () => {
    expect(astContentKey({ type: "Variable", id: "5" })).not.toBe(
      astContentKey({ type: "Variable", label: "5" })
    );
    expect(
      astContentKey({ type: "Variable", label: "x", valueType: "Integer" })
    ).not.toBe(astContentKey({ type: "Variable", label: "x" }));
  });

  it("rejects a Variable with neither id nor label", () => {
    expect(() => ASTToCondensed({ type: "Variable" } as TypeAST.AST)).toThrow(
      /requires an id or a label/
    );
  });

  it("uses expandedRefForm name versus varId", () => {
    const network = ExpandedToAST("a = 5\nb = add(a, 1)");
    const byVarId = ASTToExpandedWithSignatureOptions(
      network,
      "Condensed",
      null,
      false,
      undefined,
      { expandedRefForm: "varId" }
    );
    const byName = ASTToExpandedWithSignatureOptions(
      network,
      "Condensed",
      null,
      false,
      undefined,
      { expandedRefForm: "name" }
    );
    expect(byVarId).toContain("b = numberAdd(0, 1)");
    expect(byName).toContain("b = numberAdd(@a, 1)");
  });

  it("fails hard for an unresolved label", () => {
    expect(() => ExpandedToAST("b = add(@missing, 1)")).toThrow(
      /Unknown card reference: @missing/
    );
  });

  it("resolves a label to the matching definition", () => {
    const network = ExpandedToAST("a = 5\nb = add(@a, 1)");
    const output = astToGiveCommands(network);
    expect(output.lines.join("\n")).toContain(
      'operatorName:"integrateddynamics:arithmetic_addition"'
    );
  });
});
