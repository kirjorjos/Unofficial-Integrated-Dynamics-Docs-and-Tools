/**
 * Test the NBT transformer.
 * @author kirjorjos
 */

import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ASTtoNBT, NBTtoAST } from "../../transformers/NBT";

describe("TestNBTTransformer", () => {
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

  describe("TestASTtoNBT", () => {
    it("testASTtoNBT", () => {
      const nbt = ASTtoNBT(curryAST);
      expect(nbt).toBeInstanceOf(CompoundTag);
      expect((nbt as CompoundTag).has({ valueOf: () => "curry" } as any)).toBe(
        true
      );
    });
  });

  describe("TestNBTtoAST", () => {
    it("testRoundTripASTtoNBTtoAST", () => {
      const nbt = ASTtoNBT(curryAST);
      const roundTripAST = NBTtoAST(nbt);
      expect(roundTripAST).toEqual(curryAST);
    });

    it("testPrimitiveASTtoNBTtoAST", () => {
      const nbt = ASTtoNBT(integerAST);
      const roundTripAST = NBTtoAST(nbt, "integrateddynamics:integer");
      expect(roundTripAST).toEqual(integerAST);
    });
  });
});
