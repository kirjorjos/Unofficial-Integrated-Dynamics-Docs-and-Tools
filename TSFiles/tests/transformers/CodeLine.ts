import { ASTToCodeLine, CodeLineToAST } from "../../transformers/CodeLine";

describe("TestCodeLineTransformer", () => {
  it("testBlock", () => {
    const code = 'Block("minecraft:stone")';
    const ast = CodeLineToAST(code);
    expect(ast).toEqual({ type: "Block", value: { id: "minecraft:stone" } });
    expect(ASTToCodeLine(ast)).toBe(code);
  });

  it("testLambda", () => {
    const CodeLine = "x => add(x, 1)";
    const ast = CodeLineToAST(CodeLine);
    const code = ASTToCodeLine(ast);
    expect(CodeLineToAST(code)).toEqual(ast);
  });
  
  it("testComplicated1", () => {
    const code =
      'pipe2 (pipe (pipe (flip nbtCompoundValueString "AspectFilter") eq) (pipe (pipe itemNBT nbtGetTag))) (pipe (pipe (flip nbtCompoundValueInteger "Amount") (eq 0)) &&) pipe';
    const ast = CodeLineToAST(code);
    const back = ASTToCodeLine(ast);
    expect(CodeLineToAST(back)).toEqual(ast);
  });

  it("testComplicated2", () => {
    const code =
      "pipe (pipe (pipe lt (pipe listLength)) map) (flip pipe (reduce1 and)) min";
    const ast = CodeLineToAST(code);
    const back = ASTToCodeLine(ast);
    expect(CodeLineToAST(back)).toEqual(ast);
  });

  it("testSimpleCurry", () => {
    const code = "(eq 0)";
    const ast = CodeLineToAST(code);
    expect(ast.type).toBe("Curry");
    expect(((ast as TypeAST.Curried).args[0] as TypeAST.Integer).value).toBe("0");
  });

  it("testRoundTrip", () => {
    const cases = [
      "1",
      "2l",
      "3.0",
      '"hi"',
      "true",
      "null",
      "(eq 1)",
      "pipe (pipe add 1) multiply",
    ];
    for (const c of cases) {
      const ast = CodeLineToAST(c);
      const back = ASTToCodeLine(ast);
      expect(ASTToCodeLine(CodeLineToAST(back))).toBe(back);
    }
  });

  it("testAmbigiousCodeLine", () => {
    const ambiguous = "apply3 pipe increment multiply";
    expect(() => CodeLineToAST(ambiguous)).toThrow();
  });
});
