/**
 * Test the JSON transformer.
 * @author kirjorjos
 */

import { ASTtoJSON, JSONtoAST } from "../../transformers/JSON";

describe("TestJSONTransformer", () => {
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

  describe("TestASTtoJSON", () => {
    it("testASTtoJSON", () => {
      const json = ASTtoJSON(curryAST);
      expect(typeof json).toBe("object");
      expect(json).toHaveProperty("curry");
    });
  });

  describe("TestJSONtoAST", () => {
    it("testRoundTripASTtoJSONtoAST", () => {
      const json = ASTtoJSON(curryAST);
      const roundTripAST = JSONtoAST(json);
      expect(roundTripAST).toEqual(curryAST);
    });

    it("testPrimitiveASTtoJSONtoAST", () => {
      const json = ASTtoJSON(integerAST);
      const roundTripAST = JSONtoAST(json, "integrateddynamics:integer");
      expect(roundTripAST).toEqual(integerAST);
    });
  });
});
