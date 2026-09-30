import { ASTtoSNBT, SNBTToAST } from "lib/transformers/NBT";

describe("TestSNBTBridge", () => {
  let curryAST: TypeAST.Curried;
  let integerAST: TypeAST.Integer;

  beforeEach(() => {
    curryAST = {
      type: "Curry",
      base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
      args: [{ type: "Integer", value: "10" }],
    };
    integerAST = { type: "Integer", value: "42" };
  });

  it("testSerializesAnOperatorToAnSnbtCompound", () => {
    const text = ASTtoSNBT(curryAST);
    expect(text.startsWith("{")).toBe(true);
    expect(text.endsWith("}")).toBe(true);
    expect(text).toContain("curry");
  });

  it("testRoundTripsAnOperator", () => {
    expect(SNBTToAST(ASTtoSNBT(curryAST))).toEqual(curryAST);
  });

  it("testRoundTripsAPrimitiveThroughItsValueTypeName", () => {
    const text = ASTtoSNBT(integerAST);
    expect(SNBTToAST(text, "integrateddynamics:integer")).toEqual(integerAST);
  });

  it("testRejectsTrailingContent", () => {
    expect(() => SNBTToAST(`${ASTtoSNBT(integerAST)} junk`)).toThrow();
  });
});
